import { prisma } from '@/libs/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function sendEmailHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    res.status(500).json({error: err});
  }
}
