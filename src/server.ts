import express from 'express';

import userRoute from './router/userRoute';
import artistRoute from './router/artistRoute';
import { verifyToken } from './middlewares/authMiddleware';

const app = express();
const port = process.env.PORT || 8080;

// compatibilidade
app.use(express.json());

// rotas - usuários CRUD
app.use('/', userRoute); 

// rotas - artista CRUD
app.use('/', artistRoute)

// rota pública - home
app.get('/home', (req, res) => {
    return res.status(200).json({ message: 'bem-vindo a home do TUM.' })
})

// rota privada - settings
app.get('/settings', verifyToken, (req, res) => {
    return res.status(200).json({ message: 'rota privada - configurações' })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})