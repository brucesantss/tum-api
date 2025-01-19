import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user.routes';
import artistRoutes from './routes/artist.routes';
import planRoutes from './routes/plan.routes';
import paymentRoutes from './routes/payment.routes';
import adminRoutes from './routes/admin.routes';
import comicRoutes from './routes/comic.routes';


import { verifyToken } from './middlewares/authMiddleware';
import { sessionConfig } from './middlewares/sessionMiddleware';

const app = express();
const port = process.env.PORT || 8080;

// compatibilidade
app.use(express.json());
app.use(sessionConfig);

app.use(cors({
    origin: 'http://localhost:5173'
}))

// rotas - usuários CRUD
app.use('/', userRoutes); 

// rotas - artista CRUD
app.use('/', artistRoutes)

// rotas - planos
app.use('/', planRoutes)

// rotas - admin
app.use('/', adminRoutes)

// rotas - comic
app.use('/', comicRoutes)

// rota pública - pagamento mercado pago
app.use('/', paymentRoutes)

// rota pública - home
app.get('/home', (req, res) => {
    return res.status(200).json({ message: 'bem-vindo a home do TUM.' })
})

// rota privada - settings
app.get('/settings', (req, res) => {
    if (!req.session.user) {
        res.status(401).json({ message: "settings sem acesso: faça login." });
        return;
    }

    console.log('acessou o dashboard, ', req.session);
    res.status(200).json({ message: `settings da conta: ${req.session.user.nome}` });
})

//payment
app.use('/', paymentRoutes);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})