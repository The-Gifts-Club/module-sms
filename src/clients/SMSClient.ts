/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class SMSClient {
  public client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.smspartner.fr/v1",
    });
  }

  public async pushSMS(smsConfig: Record<string, any>){
    const config: string = JSON.stringify(smsConfig)

    const response: AxiosResponse = this.client.post('/bulk-send', config)

    return response.data.statusCode

  }
}
