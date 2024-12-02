/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class UtilsClient {
  public client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.smspartner.fr/v1/",
    });
  }

  public async getStats(
    interval: Record<string, string> | string
  ): Promise<Record<any, any>> {
    const config: AxiosRequestConfig = {
      params: interval,
    };

    const response: AxiosResponse = await this.client.get(
      "/statistics/cost-resume",
      config
    );

    const result = {
      monthlyResult: response.data.datas,
      success: response.data.success,
    };
    return result;
  }
}
