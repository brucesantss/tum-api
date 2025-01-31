import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addFavorite = async (req: Request, res: Response) => {
    const { userId, comicId } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const comic = await prisma.comic.findUnique({ where: { id: parseInt(comicId, 10) } });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        if (!comic) {
            return res.status(404).json({ message: 'Comic não encontrada.' });
        }

        await prisma.user.update({
            where: { id: userId },
            data: {
                comicsFav: {
                    connect: { id: parseInt(comicId, 10) },
                },
            },
        });

        return res.status(200).json({ message: 'Comic adicionada aos favoritos.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao adicionar favorito.' });
    }
};


export const removeFavorite = async (req: Request, res: Response) => {
    const { userId, comicId } = req.body;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                comicsFav: {
                    disconnect: { id: comicId },
                },
            },
        });

        return res.status(200).json({ message: 'Comic removida dos favoritos.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao remover favorito.' });
    }
};

export const listFavorites = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const favorites = await prisma.user.findUnique({
            where: { id: userId },
            include: { comicsFav: true },
        });

        return res.status(200).json({ favorites });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao listar favoritos.' });
    }
};
