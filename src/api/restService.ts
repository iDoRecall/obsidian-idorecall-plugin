import axios, { AxiosRequestConfig } from 'axios';
import { environment } from '../environments/environment';
import { usePluginState } from '../states/plugin';
import { HttpResponse } from '../models';

export class RestService {
    private static _instance: RestService;
    private readonly api = axios.create({
        baseURL: `${environment.serverURL}${environment.apiUrl}`,
        headers: {
            Authorization: usePluginState.getState().settings?.apiKey,
        },
    });

    public static get instance(): RestService {
        if (!RestService._instance) {
            RestService._instance = new RestService();
        }
        return RestService._instance;
    }

    public async get<T>(
        url: string,
        config?: AxiosRequestConfig<any> | undefined,
    ): Promise<T> {
        return await this.api
            .get<HttpResponse<T>>(url, config)
            .then(({ data }) => data)
            .then(({ data }) => data.payload);
    }

    public async post<T>(
        url: string,
        payload?: any,
        config?: AxiosRequestConfig<any> | undefined,
    ): Promise<T> {
        return await this.api
            .post<HttpResponse<T>>(url, payload, config)
            .then(({ data }) => data)
            .then(({ data }) => data.payload);
    }

    public async patch<T>(
        url: string,
        payload?: any,
        config?: AxiosRequestConfig<any> | undefined,
    ): Promise<T> {
        return await this.api
            .patch<HttpResponse<T>>(url, payload, config)
            .then(({ data }) => data)
            .then(({ data }) => data.payload);
    }

    public async delete<T>(
        url: string,
        config?: AxiosRequestConfig<any> | undefined,
    ): Promise<T> {
        return await this.api
            .delete(url, config)
            .then(({ data }) => data)
            .then(({ data }) => data.payload);
    }
}
