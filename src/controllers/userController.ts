import {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const criarContaUsuario = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {

        if(!name || !email || !password ){
            return res.status(400).json({ message:'faltando dados: nome, email ou senha.' })
        }

        // email ou usuário já existente        
        const emailUnico = await prisma.user.findUnique({ where: {email} });
        if(emailUnico){
            return res.status(409).json({ message: "esse email já está sendo usado." })
        }

        // hash de senha - segurança
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // criando usuário e armazenando no DB
        const criarConta = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash
            }
        });

        if(!criarConta){
            return res.status(400).json({ message: 'ocorreu um erro ao criar a conta.' })
        }

        return res.status(201).json({ message: 'conta criada. faça login!' });
    } catch (err) {
       console.log('erro no console: ', err);
       return res.status(500).json({ message: 'ocorreu um erro ao criar a conta.' })
    }
}

export const excluirContaUsuario = async (req: Request, res: Response) => {

    try {
            
        const { email, password } = req.body;

        const conta = await prisma.user.findFirst({ where: { email } });

        if(!conta){
            return res.status(404).json({ message: 'conta não encontrada. crie uma!' })
        }

        // verifica senha - hash de senha
        const compareHash = await bcrypt.compare(password, conta.password);
        if(!compareHash){
            return res.status(401).json({ message: 'senha incorreta. esqueceu a senha?' })
        }

        const contaExcluida = await prisma.user.delete({ where: { email } });
        console.log('conta deletada: ', contaExcluida);
        return res.status(200).json({ message: 'sua conta foi excluída com sucesso.' })
        
    } catch (err) {
        console.log('erro no console: ', err);
        return res.status(500).json({ message: 'ocorreu um erro ao excluir conta.' })
    }

}

export const loginConta = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try{
        const conta = await prisma.user.findUnique({ where: {email} });

        if(!conta){
            return res.status(404).json({ message: 'conta não encontrada. crie uma!' })
        }

        // verifica senha - hash de senha
        const compareHash = await bcrypt.compare(password, conta.password);
        if(!compareHash){
            return res.status(401).json({ message: 'senha incorreta. esqueceu a senha?' })
        }

        const contaNome = conta.name;
        req.session.user = {nome: contaNome}
        
        return res.status(200).json({ message: `${contaNome}, entrou na conta.` })

    }catch(err){
        console.log(err);
        return res.status(500).json({ message: 'ocorreu um erro ao entrar na conta.' }) 
    }
}

export const logoutConta = (req: Request, res: Response) => {

    try {

        if(!req.session.user){
            res.status(400).json({ message: 'você já está desconectado. fazer login?' });
            return;
        }
        
        const nomeConta = req.session.user.nome;

    req.session.destroy(err => {
        if (err) {
            console.log('erro ao sair da conta.', err);
            res.status(500).json({ message: 'erro ao sair da conta, tente novamente.' })
        }
    });

    res.clearCookie('connect.sid');
    res.status(200).json({ message: `${nomeConta} saiu da conta.` });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ocorreu um erro ao sair na conta.' }) 
    }

}

export const getAllUsers = async (req: Request, res: Response) => {

    try {
        
        const users = await prisma.user.findMany();
        return res.status(200).json({ message: users })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ocorreu um erro ao buscar todos os usuários.' }) 
    }

}

