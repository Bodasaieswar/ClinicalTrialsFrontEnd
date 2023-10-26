import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient from '../services/api-client';

const apiClient = new APIClient('/clinicalTrials');

const useClinicalTrials = () => {
	return useQuery({
		queryKey: ['allclinicaltrials'],
		queryFn: apiClient.getAll,
		staleTime: ms('24h'),
		// initialData: clinicalData,
	});
};

export default useClinicalTrials;
