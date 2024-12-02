import {} from "ts-jest";
import UserClient from "../../clients/UserClient";

const client: UserClient = new UserClient()

const subAccountConfig: Record<string, string> = {
    apiKey: "adc115beea12880b282f70bd18e10613fe4c427d",
    type: "simple"
  };

const addCreditConfig: Record <string, string> = {
    apiKey: "adc115beea12880b282f70bd18e10613fe4c427d",
    credit: "0.01",
    tokenSubaccount: "21fedcb927ba73c081f63ac217e464531abd867c"
}

test("Create sub account", async () => {
    const result = await client.createSubAccount(subAccountConfig)
    expect(result).toBe(2)
})

test("Check balance on an account", async () => {
    const result = await client.checkBalance("adc115beea12880b282f70bd18e10613fe4c427d")
    expect(result).toContain({
        code: 200
    })
})

test("Add credit to an account", async () => {
    const result = await client.addCredits(addCreditConfig)
    expect(result).toContain({
        code: "200"
    })
})