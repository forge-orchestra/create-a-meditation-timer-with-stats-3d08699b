import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Meditation } from '@prisma/client';
import Cors from 'cors';

const prisma = new PrismaClient();

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

type ErrorResponse = {
  error: string;
};

type MeditationResponse = {
  meditation: Meditation;
};

type MeditationsResponse = {
  meditations: Meditation[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<MeditationResponse | MeditationsResponse | ErrorResponse>) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case 'GET':
      try {
        const meditations = await prisma.meditation.findMany();
        res.status(200).json({ meditations });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meditations' });
      }
      break;

    case 'POST':
      try {
        const { duration, date } = req.body;
        if (!duration || !date) {
          res.status(400).json({ error: 'Duration and date are required' });
          return;
        }
        const meditation = await prisma.meditation.create({
          data: { duration, date: new Date(date) },
        });
        res.status(201).json({ meditation });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create meditation' });
      }
      break;

    case 'PUT':
      try {
        const { id, duration, date } = req.body;
        if (!id || !duration || !date) {
          res.status(400).json({ error: 'ID, duration, and date are required' });
          return;
        }
        const meditation = await prisma.meditation.update({
          where: { id },
          data: { duration, date: new Date(date) },
        });
        res.status(200).json({ meditation });
      } catch (error) {
        res.status(500).json({ error: 'Failed to update meditation' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        if (!id) {
          res.status(400).json({ error: 'ID is required' });
          return;
        }
        await prisma.meditation.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete meditation' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}