import axios, { AxiosRequestConfig } from 'axios';
import ClinicalTrails from '../entities/ClinicalTrials';
import ClinicalTrialDetails from '../entities/ClinicalTrailDetails';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api',
});

class APIClient {
	endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	getAll = async (config: AxiosRequestConfig) => {
		const res = await axiosInstance.get<ClinicalTrails[]>(
			this.endpoint,
			config,
		);
		return res.data;
	};

	get = async (NCTId: undefined | string) => {
		const res = await axiosInstance.get<ClinicalTrialDetails>(
			this.endpoint + '/' + NCTId,
		);
		return res.data;
	};
}

export default APIClient;
