import { LucideIcon } from 'lucide-react';

/**
 * Type for meditation session statistics.
 */
export type MeditationStats = {
  totalSessions: number;
  totalMinutes: number;
  averageSessionLength: number;
};

/**
 * Type for a single meditation session.
 */
export type MeditationSession = {
  date: Date;
  duration: number; // in minutes
};

/**
 * Calculates meditation statistics from a list of sessions.
 * @param sessions - Array of meditation sessions.
 * @returns MeditationStats object with calculated statistics.
 */
export function calculateMeditationStats(sessions: MeditationSession[]): MeditationStats {
  if (!Array.isArray(sessions)) {
    throw new Error('Invalid input: sessions must be an array');
  }

  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((acc, session) => acc + session.duration, 0);
  const averageSessionLength = totalSessions === 0 ? 0 : totalMinutes / totalSessions;

  return {
    totalSessions,
    totalMinutes,
    averageSessionLength,
  };
}

/**
 * Formats a date object into a readable string.
 * @param date - Date object to format.
 * @returns Formatted date string.
 */
export function formatDate(date: Date): string {
  if (!(date instanceof Date)) {
    throw new Error('Invalid input: date must be a Date object');
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Validates if a given duration is a positive number.
 * @param duration - Duration in minutes.
 * @returns Boolean indicating if the duration is valid.
 */
export function isValidDuration(duration: number): boolean {
  if (typeof duration !== 'number' || isNaN(duration)) {
    throw new Error('Invalid input: duration must be a number');
  }

  return duration > 0;
}

export { LucideIcon };