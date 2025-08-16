import { fetchFantasyData } from './base';
import { Team } from '@/types/Team';

export async function fetchTeams(): Promise<Team[]> {
  const data = await fetchFantasyData();
  return data.teams;
}

