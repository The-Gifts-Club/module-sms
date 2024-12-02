/* eslint-disable @typescript-eslint/no-explicit-any */
import {} from "ts-jest";
import SMSClient from "../../clients/SMSClient";

const client: SMSClient = new SMSClient();

const configSMS: Record<string, any> = {
  apiKey: "adc115beea12880b282f70bd18e10613fe4c427d",
  phoneNumbers: "+33667639842",
  sender: "TGC",
  message: "Test SMS",
  scheduledDeliveryDate: "25/11/2024",
  time: "17",
  minute: "15",
  sandbox: "1",
};

const configBatch: Record<string, any> = {
  apiKey: "adc115beea12880b282f70bd18e10613fe4c427d",
  SMSList: [
    {
      phoneNumber: "0667639842",
      message: "Test",
    },
    {
      phoneNumber: "0667639843",
      message: "Test2",
    },
  ],
  sandbox: "1",
};

const configCancel: Record<string, any> = {
  apiKey: "adc115beea12880b282f70bd18e10613fe4c427d",
  messageId: "73477295",
};

test("send a single sms", async () => {
  const result = await client.sendSMS(configSMS);
  expect(result).toContain({
    statusCode: 200,
  });
});

test("Send a batch sms", async () => {
  const result = await client.sendBatchSMS(configBatch);
  expect(result).toContain({
    statusCode: 200,
  });
});

test("cancel sms", async () => {
  const result = await client.cancelSMS(configCancel);
  expect(result).toEqual(200);
});
