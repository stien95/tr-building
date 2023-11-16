import { prisma } from '@/libs/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function sendEmailHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).json({"Error": "invalid method"});
  }
  const { email, lang } = req.body;
  try {
    const createEmail = await prisma.email.create({
      data: {
        email,
        lang,
      },
    });
    res.status(201).json({message: "Email registered successfully"});
  } catch (err) {
    console.error('Error al enviar el correo electrónico:', err);
    res.status(500).json({ mensaje: 'Error interno del servidor al enviar el correo electrónico' });
  
  }
}
