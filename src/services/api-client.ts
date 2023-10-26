import axios, { AxiosRequestConfig } from 'axios';
import ClinicalTrails from '../entities/ClinicalTrials';

const axiosInstance = axios.create({
	baseURL: 'https://bodasaieswar.info/api',
});

class APIClient {
	endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	getAll = (config: AxiosRequestConfig) => {
		return axiosInstance
			.get<ClinicalTrails[]>(this.endpoint, config)
			.then((res) => {
				return res.data;
			});
	};

	// get = (id: number | string) => {
	// 	return axiosInstance
	// 		.get<T>(this.endpoint + '/' + id)
	// 		.then((res) => res.data);
	// };
}

export default APIClient;
