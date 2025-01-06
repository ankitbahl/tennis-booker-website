import axios, { AxiosRequestConfig } from "axios";

export class AxiosHelper {
    static email: string;
    static token: string;
    constructor(email: string, token: string) {
        AxiosHelper.email = email;
        AxiosHelper.token = token;
    }

    static async getWithAxios(url: string, params?: AxiosRequestConfig<any>) {
        AxiosHelper.validateAxios();
        const axiosParams = AxiosHelper.attachAuth(params);
        return axios.get(url, axiosParams);
    }

    static async postWithAxios(url: string, data?: any, params?: AxiosRequestConfig<any>) {
        AxiosHelper.validateAxios();
        const axiosParams = AxiosHelper.attachAuth(params);
        return axios.post(url, data, axiosParams);
    }

    private static validateAxios() {
        if (!AxiosHelper.email || !AxiosHelper.token) {
            throw new Error('Axios client not set up with email and token.');
        }
    }

    private static attachAuth(params?: AxiosRequestConfig<any>) {
        return {...params, headers: {...params?.headers || {}, email: AxiosHelper.email, token: AxiosHelper.token}};
    }
}