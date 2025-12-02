import { ReactNode } from 'react';

export interface MeditationSession {
  id: string;
  duration: number; // in minutes
  date: Date;
}

export interface MeditationStats {
  totalSessions: number;
  totalMinutes: number;
  averageDuration: number; // in minutes
}

export interface AppState {
  sessions: MeditationSession[];
  stats: MeditationStats;
}

export interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export interface StatsProps {
  stats: MeditationStats;
}

export interface HistoryProps {
  sessions: MeditationSession[];
}

export interface LayoutProps {
  children: ReactNode;
}

export interface IconProps {
  size?: number;
  color?: string;
}