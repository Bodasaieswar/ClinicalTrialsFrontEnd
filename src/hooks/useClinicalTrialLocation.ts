import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient from '../services/api-client';

const apiClient = new APIClient('/clinicalTrials/locations');

const useClinicalTrialLocation = (slug: string | undefined) => {
	return useQuery({
		queryKey: ['clinicaltrialslocation', slug],
		queryFn: () => apiClient.getTrialLocation(slug),
		staleTime: ms('24h'), // Data will become stale after 24 hours
		// initialData: () => {
		// 	return queryClient.getQueryData(['allclinicaltrails']);
		// },
	});
};

export default useClinicalTrialLocation;
