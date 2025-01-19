import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"; // Ajuste o caminho conforme necessário

const prisma = new PrismaClient();

export const createComic = async (req: Request, res: Response) => {
    try {
        const { title, isOriginalTum, coCreators, artist, author, genre, genreSecond, dayChapterRelease, synopsis, banner, thumbnail } = req.body;

        // Verificar se o usuário está logado
        if (!req.session.user || !req.session.user.nome) {
            return res.status(401).json({ message: "faça login, para criar comics." });
        }

        const userName = req.session.user.nome;

        // Buscar o usuário pelo email
        const user = await prisma.user.findUnique({
            where: { name: userName },
            select: {email: true, id: true}
        });

        if (!user) {
            return res.status(404).json({ message: "usuário não encontrado." });
        }

        // Buscar o artista pelo userId
        const artistFind = await prisma.artist.findUnique({
            where: { userId: user.id },
        });

        if (!artistFind) {
            return res.status(400).json({ message: "o usuário logado não possui uma conta de artista." });
        }

        const artistId = artistFind.id;

        // Verificação - Campos obrigatórios
        if (!title || !isOriginalTum || !genre || !genreSecond) {
            return res.status(400).json({ message: "todos os campos são obrigatórios." });
        }

        // Verificação - Co-criadores
        let coCreatorsData = [];
        if (coCreators && coCreators.length > 0) {
            coCreatorsData = await prisma.user.findMany({
                where: {
                    email: { in: coCreators },
                },
                select: { id: true },
            });

            if (coCreatorsData.length !== coCreators.length) {
                return res.status(400).json({
                    message: "Um ou mais co-criadores não foram encontrados.",
                });
            }
        }

        // Criação da Comic
        const newComic = await prisma.comic.create({
            data: {
                title,
                isOriginalTum,
                coCreators: {
                    connect: coCreatorsData.map((user) => ({ id: user.id })),
                },
                genre,
                genreSecond,
                synopsis,
                banner,
                thumbnail,
                artistId //auto-complete
            },
        });

        // Retorno
        return res.status(201).json({
            message: "Comic criada com sucesso!",
            comic: newComic,
        });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({
            message: "Erro ao criar a Comic.",
            error: err.message,
        });
    }
};

