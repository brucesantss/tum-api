import { Request, Response } from 'express';
import { createPayment } from '../services/paymentService';

export const criarPagamento = async (req: Request, res: Response) => {
  try {
    const paymentData = req.body; // Pegando os dados da requisição
    const paymentResponse = await createPayment(paymentData); // Chamando a função do serviço
    res.status(200).json(paymentResponse); // Retornando o resultado para o cliente
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
