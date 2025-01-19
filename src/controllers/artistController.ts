import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcrypt'; 

const prisma = new PrismaClient();

export const criarContaArtista = async (req: Request, res: Response) => {

    try {

        const { email, password, biography } = req.body;

        if (!email || !password || !biography) {
            return res.status(400).json({ message: 'campos faltando.' })
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

        // verifica senha - hash de senha
        const compareHash = await bcrypt.compare(password, user.password);
        if (!compareHash) {
            return res.status(401).json({ message: 'senha incorreta. esqueceu a senha?' })
        }

        // verificar se o usuário já é um artista
        const existingArtist = await prisma.artist.findUnique({
            where: { userId: user.id },
        });

        if (existingArtist) {
            return res.status(400).json({ message: "o usuário já possui uma conta de artista." });
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