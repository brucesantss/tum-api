import {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client';

import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const criarConta = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {

        if(!email || !password ){
            return res.status(400).json({ message:'cade os dados amigo?' })
        }

        // email ou usuário já existente
        const emailUnique = await prisma.user.findUnique({ where: {email} });
        if(emailUnique){
            return res.status(409).json({ message: "esse email já está sendo usado." })
        }

        const create = await prisma.user.create({
            data: {
                email,
                password
            }
        });

        if(!create){
            return res.status(400).json({ message: 'ocorreu um erro ao criar a conta.' })
        }

        return res.status(201).json({ message: 'conta criada. faça login!' });
    } catch (err) {
       console.log('erro no console: ', err);
       return res.status(500).json({ message: 'ocorreu um erro ao criar a conta.' })
    }
}

export const loginConta = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try{
        const conta = await prisma.user.findUnique({ where: {email}});

        if(!conta){
            return res.status(404).json({ message: 'conta não encontrada. crie uma!' })
        }

        // verfica senha
        if(conta.password !== password){
            return res.status(400).json({ message: 'a senhas não são iguais.' })
        }

        

        return res.status(200).json({ message: conta })
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: 'ocorreu um erro ao entrar na conta.' }) 
    }
}

