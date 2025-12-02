import { NextApiRequest, NextApiResponse } from 'next';
import { MeditationSession, UserStats } from '../types/models';

export type GetMeditationSessionsResponse = {
  sessions: MeditationSession[];
};

export type GetUserStatsResponse = {
  stats: UserStats;
};

export type CreateMeditationSessionRequest = {
  duration: number;
  date: string;
};

export type CreateMeditationSessionResponse = {
  session: MeditationSession;
};

export type ErrorResponse = {
  error: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      handleGet(req, res);
      break;
    case 'POST':
      handlePost(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<GetMeditationSessionsResponse | GetUserStatsResponse | ErrorResponse>) {
  try {
    const { type } = req.query;
    if (type === 'sessions') {
      const sessions = await fetchMeditationSessions();
      res.status(200).json({ sessions });
    } else if (type === 'stats') {
      const stats = await fetchUserStats();
      res.status(200).json({ stats });
    } else {
      res.status(400).json({ error: 'Invalid query parameter' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<CreateMeditationSessionResponse | ErrorResponse>) {
  try {
    const { duration, date } = req.body as CreateMeditationSessionRequest;
    if (!duration || !date) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
    const session = await createMeditationSession({ duration, date });
    res.status(201).json({ session });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function fetchMeditationSessions(): Promise<MeditationSession[]> {
  // Fetch logic for meditation sessions
  return [];
}

async function fetchUserStats(): Promise<UserStats> {
  // Fetch logic for user stats
  return { totalTime: 0, sessionCount: 0 };
}

async function createMeditationSession(request: CreateMeditationSessionRequest): Promise<MeditationSession> {
  // Logic to create a new meditation session
  return { id: '1', duration: request.duration, date: request.date };
}