import express from 'express';

import userRoutes from './routes/user.routes';
import artistRoutes from './routes/artist.routes';
import planRoutes from './routes/plan.routes';
import paymentRoutes from './routes/payment.routes';

import { verifyToken } from './middlewares/authMiddleware';
import { sessionConfig } from './middlewares/sessionMiddleware';

const app = express();
const port = process.env.PORT || 8080;

// compatibilidade
app.use(express.json());
app.use(sessionConfig);

// rotas - usuários CRUD
app.use('/', userRoutes); 

// rotas - artista CRUD
app.use('/', artistRoutes)

// rotas - planos
app.use('/', planRoutes)

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