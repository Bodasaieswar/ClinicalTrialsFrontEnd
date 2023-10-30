import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient from '../services/api-client';

const apiClient = new APIClient('/clinicalTrials/');

const useClinicalTrialDetails = (slug: string | undefined) => {
	return useQuery({
		queryKey: ['clinicaltrialdetails', slug],
		queryFn: () => apiClient.get(slug),
		staleTime: ms('24h'),
	});
};

export default useClinicalTrialDetails;
