import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient from '../services/api-client';

const apiClient = new APIClient('/clinicalTrials');

const useClinicalTrials = () => {
	return useQuery({
		queryKey: ['allclinicaltrials'],
		queryFn: apiClient.getAll,
		staleTime: ms('24h'), // Data will become stale after 24 hours
		// initialData: () => {
		// 	return queryClient.getQueryData(['allclinicaltrails']);
		// },
	});
};

export default useClinicalTrials;
