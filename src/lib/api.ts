import { useQuery } from '@tanstack/react-query';
import { campaigns, dashboard } from './mock';

const latency = <T>(value: T, ms = 500) => new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

/** The only integration point. Replace each body with a fetch() call later; hooks and UI stay unchanged. */
export const api = {
  getCampaigns: () => latency(campaigns),
  getDashboard: () => latency(dashboard),
};

export const useCampaigns = () => useQuery({ queryKey: ['campaigns'], queryFn: api.getCampaigns });
export const useDashboard = () => useQuery({ queryKey: ['dashboard'], queryFn: api.getDashboard });
