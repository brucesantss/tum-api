import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const procurarUsuarios = async (req: Request, res: Response) => {
    const { q } = req.query;

    try {
        // caso não tenha paramentros, retorna todos os usuários do DB
        if (!q || typeof q !== "string") {
            const todosUsuarios = await prisma.user.findMany();
            return res.status(200).json({ message: todosUsuarios });
        }

        // caso um parâmetro seja enviado, faz a busca
        const usuarios = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: q } }, // Busca por nome
                    { email: { contains: q } }, // Busca por email
                ],
            },
        });

        if (usuarios.length === 0) {
            return res.status(404).json({ message: "nenhum usuário encontrado." });
        }

        return res.status(200).json({ message: usuarios });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "erro ao buscar usuários." });
    }
};