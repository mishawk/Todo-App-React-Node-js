import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { STORAGE_KEYS } from '~shared/keys';

interface RequestBody {
	[key: string]:
		| string
		| number
		| boolean
		| object
		| string[]
		| number[]
		| object[];
}

export class HttpService {
	private readonly baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
			const headers: Record<string, string> = {};

			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}

			const finalConfig = {
				...config,
				headers: { ...headers, ...config?.headers },
			};

			const response: AxiosResponse<T> = await axios.get(
				`${this.baseUrl}${url}`,
				finalConfig,
			);

			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async post<T>(url: string, body: RequestBody): Promise<T> {
		try {
			const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
			const headers: Record<string, string> = {};

			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}
			const response: AxiosResponse<T> = await axios.post(
				`${this.baseUrl}${url}`,
				body,
				{ headers },
			);

			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async put<T>(url: string, body: RequestBody): Promise<T> {
		try {
			const response: AxiosResponse<T> = await axios.put(
				`${this.baseUrl}${url}`,
				body,
			);

			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async delete(url: string): Promise<void> {
		try {
			await axios.delete(`${this.baseUrl}${url}`);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
