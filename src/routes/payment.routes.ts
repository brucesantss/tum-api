import { Router } from 'express';
import { paymentCredit, paymentPix } from '../services/paymentService'; 

const router = Router();

router
    .post('/assinaturas/pagamento/pix', paymentPix)
    .post('/assinaturas/pagamento/credito', paymentCredit)

export default router;
