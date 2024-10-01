import {Request, Response} from 'express';
import { PrismaClient, Plan } from '@prisma/client';

const prisma = new PrismaClient();

export const planContract = async (req: Request, res: Response) => {
    const { email, plan, paymentMethod } = req.body;

    try {

        if(!email || !plan || !paymentMethod){
            return res.status(400).json({ message: 'preencha todos os dados.' })
        }
        
        // buscar usuário por email
        const user = await prisma.user.findUnique({ where: { email } });
        if(!user){
            return res.status(404).json({ message: 'usuário não encontrado. criar conta?' })
        }

        // verificando se plano existe
        if(!Object.values(Plan).includes(plan)){
            return res.status(400).json({ message: 'plano inválido.' })
        }

        // atualizando plano
        const updatePlanUser = await prisma.user.update({
            where: { email },
            data: { plan }
        });
        
        return res.status(200).json({ message: 'plano atualizado com sucesso.' })

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'erro no servidor. tente novamente mais tarde!' })
    }
}