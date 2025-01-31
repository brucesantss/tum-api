import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user.routes';
import artistRoutes from './routes/artist.routes';
import planRoutes from './routes/plan.routes';
import paymentRoutes from './routes/payment.routes';
import adminRoutes from './routes/admin.routes';
import comicRoutes from './routes/comic.routes';
import favoriteRoutes from './routes/favorites.routes';

// S3 SETUP
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import 'dotenv/config';

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION; 
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})

import { sessionConfig } from './middlewares/sessionMiddleware';

const app = express();
const port = process.env.PORT || 8080;

// compatibilidade
app.use(express.json());
app.use(sessionConfig);

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use('/usuarios', userRoutes); 
app.use('/artistas', artistRoutes)
app.use('/planos', planRoutes)
app.use('/admin', adminRoutes)
app.use('/comics', comicRoutes)
app.use('/favoritos', favoriteRoutes)
app.use('/pagamentos', paymentRoutes)

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})