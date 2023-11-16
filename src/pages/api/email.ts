// pages/api/sendEmail.js

import { prisma } from '@/libs/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
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

    res.status(201).json({ message: "Email registered successfully" });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Internal server error while sending the email'});
  }
}
