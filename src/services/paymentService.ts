import axios from 'axios';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { Request, Response } from 'express';
import 'dotenv/config';

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });

const payment = new Payment(client);

export const paymentPix = (req: Request, res: Response) => {
    const { email, metodo, valor } = req.body;

    try {
        const body = {
            transaction_amount: parseFloat(valor),
            description: 'Pagamento com Express.',
            payment_method_id: metodo,
            payer: {
                email: email,
                first_name: 'Bruce',
                last_name: 'Santos',
                identification: {
                    type: 'CPF',
                    number: '55306658881' // usar CPF real ou de teste válido
                }
            }
        };

        const requestOptions = {
            idempotencyKey: 'abc',
        };

        payment.create({ body, requestOptions })
            .then(pay => res.json({ message: pay.point_of_interaction.transaction_data.ticket_url }))
            .catch(console.log);

    } catch (err) {
        console.log('Erro no servidor', err);
        return res.status(500).json({ message: 'Deu ruim.' });
    }
};

const generatePayerToken = async (agreement_id: string, code: string) => {
    try {
        const response = await axios.post(
            `https://api.mercadopago.com/v2/wallet_connect/agreements/${agreement_id}/payer_token`,
            { code },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                },
            }
        );
        return response.data.payer_token;
    } catch (error) {
        console.error('Erro ao gerar payer_token:', error);
        throw new Error('Erro ao gerar payer_token.');
    }
};

// Função para pagamento com cartão de crédito
export const paymentCredit = async (req: Request, res: Response) => {
    const { email, valor, cardholderName, cpf, installments, agreement_id, code } = req.body;

    try {
        // Gerar payer_token usando agreement_id e code
        const payerToken = await generatePayerToken(agreement_id, code);

        // Dados mínimos para pagamento
        const paymentData = {
            transaction_amount: parseFloat(valor),
            token: payerToken,
            description: 'Pagamento com cartão de crédito.',
            installments: installments || 1,
            payment_method_id: 'visa', // Exemplo estático, substitua conforme necessário
            payer: {
                email,
                identification: {
                    type: 'CPF',
                    number: cpf
                },
                first_name: cardholderName.split(' ')[0],
                last_name: cardholderName.split(' ')[1] || ''
            }
        };

        const paymentResponse = await payment.create({ body: paymentData });

        res.json({
            message: 'Pagamento aprovado!',
            status: paymentResponse.status,
            details: paymentResponse
        });
    } catch (error) {
        console.error('Erro no pagamento com cartão de crédito:', error);
        res.status(500).json({ message: 'Erro ao processar o pagamento.' });
    }
};


