import SMSHelper from "../../helpers/SMSHelper";

const helper = new SMSHelper();

const numbers = Array.from({ length: 1234 }, (_, i) => i + "1");

test("chunk into several list of phone numbers", () => {
    const chunkedList = helper.chunkNumbersList(numbers)

    expect(chunkedList).toHaveLength(3)
    expect(chunkedList[0].length).toEqual(500)
    expect(chunkedList[1].length).toEqual(500)
    expect(chunkedList[2].length).toEqual(234)
});
