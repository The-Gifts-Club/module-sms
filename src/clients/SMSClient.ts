/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class SMSClient {
  public client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.smspartner.fr/v1",
    });
  }

  /**
   * Send a single function - must pass at least a number and a message to send
   * @param {Record <string, any>} smsConfig - message can be setup for a specific date if needed
   * @returns {Promise <Record <any, any>>}
   */

  public async sendSMS(
    smsConfig: Record<string, any>
  ): Promise<Record<any, any>> {
    const config: string = JSON.stringify(smsConfig);

    const response: AxiosResponse = await this.client.post("/send", config);

    const result = {
      statusCode: response.data.code,
      messageId: response.data.message_id,
      cost: response.data.cost,
    };

    return result;
  }

  /**
   * Send batch SMS function (500 max / call) - SMSList parameter is an object with a list of numbers and a message
   * @param {Record <string, any>} smsConfig - message can be setup for a specific date if needed
   * @returns {Promise <Record <any, any>>}
   */
  public async sendBatchSMS(
    smsConfig: Record<string, any>
  ): Promise<Record<any, any>> {
    const config: string = JSON.stringify(smsConfig);

    const response: AxiosResponse = await this.client.post(
      "/bulk-send",
      config
    );

    const bulkResult = {
      statusCode: response.data.code,
      messageId: response.data.message_id,
      cost: response.data.cost,
      nbSMS: response.data.nbSMS,
    };
    return bulkResult;
  }

  /**
   * Cancel SMS function - must include the message ID - batch SMS has one message ID / batch
   * @param {Record <string, any>} cancelConfig
   * @returns {number} - statusCode, 200 if succeeded
   */
  public async cancelSMS(cancelConfig: Record<any, any>): Promise<any> {
    const config: AxiosRequestConfig = {
      params: cancelConfig,
    };

    const response: AxiosResponse = await this.client.get(
      "/message-cancel",
      config
    );

    return response.data.code;
  }
}
