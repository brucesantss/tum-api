import { Request, Response } from "express";
import crypto from "crypto";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import "dotenv/config";
import sharp from 'sharp';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const storage = multer.memoryStorage();
export const upload = multer({ storage });

// SETUP S3
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  region: process.env.BUCKET_REGION!,
});

const bucketName = process.env.BUCKET_NAME!;

// RANDOM NAMES - PARA IMAGENS COM MESMO NOME
const nomeImagemS3 = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

export const uploadArquivo = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    // REDIMENSIONAR IMAGEM
    const buffer = await sharp(req.file.buffer).resize({height: 200, width: 200, fit: 'contain'}).toBuffer();

    const nomeImagem = nomeImagemS3();
    const path = if()

    const params = {
      Bucket: bucketName,
      Key: `uploads/profile/${nomeImagem}`, // Caminho no S3
      Body: buffer,
      ContentType: req.file.mimetype,
    };

    // dados que vão pro banco de dados
    const novaImagemDB = await prisma.image.create({
      data: {
        url: `https://${bucketName}.s3.${process.env.BUCKET_REGION}.amazonaws.com/uploads/${nomeImagem}`,
        path: 
      }
    })

    await s3.send(new PutObjectCommand(params));

    const imageUrl = `https://${bucketName}.s3.${process.env.BUCKET_REGION}.amazonaws.com/uploads/${nomeImagem}`;

    res.json({ url: imageUrl });
  } catch (error) {
    console.error("Erro no upload:", error);
    res.status(500).json({ error: "Erro ao enviar a imagem." });
  }
};
