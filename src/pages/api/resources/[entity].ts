import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma/client';
import { getModelNames } from '../../../utils';

const modelNames = getModelNames();

function isValidModelName(key: string): key is keyof typeof prisma {
  return modelNames.includes(key);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { entity } = req.query;

  if (!entity || !isValidModelName(entity as string)) {
    res.status(400).json({ message: 'Invalid entity' });
    return;
  }

  const model = entity as keyof typeof prisma;

  if (req.method === 'POST') {
    try {
      const result = await prisma[model].create({
        data: {
          ...JSON.parse(req.body),
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la communication avec l\'API externe' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, ...data } = JSON.parse(req.body);
      const result = await prisma[model].update({
        where: { id },
        data: {
          ...data,
          updated_at: new Date(),
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = JSON.parse(req.body);
      const result = await prisma[model].delete({
        where: { id },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status (500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
    }
  } else {
    res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
