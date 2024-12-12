/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { StatsResult } from "./types";

export default class UserClient {
  public client: AxiosInstance;
  private apiKey: string

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.smspartner.fr/v1",
    });
    this.apiKey = process.env.API_KEY as string
  }

  public async createSubAccount(
    subAccountConfig: Record<string, any>
  ): Promise<any> {
    subAccountConfig["apiKey"] = this.apiKey
    const config = JSON.stringify(subAccountConfig);

    const response: AxiosResponse = await this.client.post(
      "/subaccount/create",
      config
    );
    return response.data;
  }

  /**
   * 
   * @param {Record<string, string>} subAccountToken - token du sous-compte
   * @returns {Promise<any>}
   */
  public async deleteSubAccount(
    subAccountToken: Record<string, string>
  ): Promise<any> {
    subAccountToken["apiKey"] = this.apiKey
    const config: AxiosRequestConfig = {
      params: subAccountToken,
    };

    const response: AxiosResponse = await this.client.delete(
      "/subaccount/delete",
      config
    );

    return response.data.code;
  }

  public async listSubAccounts(
    nextPage: number | undefined
  ): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      params: {
        apiKey: "adc115beea12880b282f70bd18e10613fe4c427d",
        ...(!!nextPage && { page: nextPage }),
      },
    };

    const response: AxiosResponse = await this.client.get(
      "/subaccount/list",
      config
    );

    return response.data;
  }

  public async checkBalance(
    token: string
  ): Promise <AxiosResponse> {
    const config: AxiosRequestConfig = {
        params: {
            apiKey: token
        }
    }

    const response: AxiosResponse = await this.client.get(
        "/me",
        config
    )

    return response.data
  }

  public async addCredits(
    addCreditConfig: Record <string, string>
  ): Promise <AxiosResponse> {
    addCreditConfig["apiKey"] = this.apiKey
    const config = JSON.stringify(addCreditConfig)

    const response: AxiosResponse = await this.client.post(
        "/subaccount/credit/add",
        config
    )

    return response.data
  }

  public async getStats(
    interval: "custom" | "last_month" | "last_twelve_months"
  ): Promise<StatsResult> {
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
