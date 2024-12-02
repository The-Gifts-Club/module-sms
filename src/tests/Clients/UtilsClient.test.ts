import {} from "ts-jest";

import UtilsClient from "../../clients/UtilsClient";

const client: UtilsClient = new UtilsClient();

const configStatsSimple: Record<string, string> = {
  apiKey: "adc115beea12880b282f70bd18e10613fe4c427d",
  interval: "last_month",
};

test("get stats on last month", async () => {
  const result = await client.getStats(configStatsSimple);

  expect(result).toContain({
    success: "true",
  });
});
