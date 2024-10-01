import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';

import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const criarContaArtista = async (req: Request, res: Response) => {

    try {

        const { email, password, biography } = req.body;

        if (!email || !password || !biography) {
            return res.status(400).json({ message: 'cadê os dados amigo?' })
        }

        // pegar o usuário padrão (se existir),  para associar no futuro com conta artista
        let user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    password,
                    role: 'READER'
                },
            });
        }

        const artistCreate = await prisma.artist.create({
            data: {
                biography,
                userId: user.id
            }
        })

        await prisma.user.update({
            where: { email },
            data: { role: "ARTIST" },
        });

        return res.status(201).json({ message: 'sua conta artista foi criada.' });


    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ocorreu um erro no servidor.' })
    }



}