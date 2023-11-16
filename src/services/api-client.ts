import axios, { AxiosRequestConfig } from 'axios';
import ClinicalTrials from '../entities/ClinicalTrials';
import ClinicalTrialDetails from '../entities/ClinicalTrailDetails';
import ClinicalTrialLocation from '../entities/ClinicalTrialLocation';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api',
});

class APIClient {
	endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	getAll = async (config: AxiosRequestConfig) => {
		const res = await axiosInstance.get<ClinicalTrials[]>(
			this.endpoint,
			config,
		);
		return res.data;
	};

	get = async (protocolId: undefined | string) => {
		const res = await axiosInstance.get<ClinicalTrialDetails>(
			this.endpoint + '/' + protocolId,
		);
		return res.data;
	};

	getTrialLocation = async (nctNo: string | undefined) => {
		const res = await axiosInstance.get<ClinicalTrialLocation[]>(
			this.endpoint + '/' + nctNo,
		);
		return res.data;
	};
}

export default APIClient;
