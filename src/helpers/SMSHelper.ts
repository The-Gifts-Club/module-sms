import SMSClient from "../clients/SMSClient";

export default class SMSHelper {
  public client: SMSClient;

  constructor() {
    this.client = new SMSClient();
  }

  /**
   * Function to divide list of numbers in lists of maximum 500 phone numbers each
   * @param {string[]} phoneNumbers - list of phoneNumbers
   * @param {number} maxPhoneNumbers - max of phone numbers to put in one list
   * @returns {string[][]}
   */
  public chunkNumbersList(
    phoneNumbers: string[],
    maxPhoneNumbers: number = 500
  ): string[][] {
    const result: string[][] = [];

    for (let i = 0; i < phoneNumbers.length; i += maxPhoneNumbers) {
      result.push(phoneNumbers.slice(i, i + maxPhoneNumbers));
    }
    return result;
  }

  // aws module needed
  /*
  public async getNumbersList(smsCampaignID: string) {
    
  }*/

  public async getExternalNumbers(
    userID: string
  ): Promise<string> {
    //open file from S3
    const externalNumbers: string = ""; // use S3 function, with userID to get the file on a specific bucket
    return externalNumbers
  }

  public getPhoneNumbers(externalNumbers: string, columnName: string): string[] {
    //split the content into lines
    const lines = externalNumbers.split("\n");

    //extract the header (first line)

    const headers = lines[0].split(",");

    //find the index of the column

    const columnIndex = headers.indexOf(columnName);

    //extract data from the column

    const phoneNumbers: string[] = [];
    const frenchPhoneRegex = /\+33[\s-]?[67]\d{8}|0[67]\d{8}/g;
    const strictFrenchPhoneRegex = /^[67]\d{8}$/; // Strict regex for mobile numbers starting with 6 or 7 and exactly 9 digits

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Skip empty lines

      const values = line.split(",");
      const cell = values[columnIndex]?.trim();
      if (cell) {
        // Check if the number matches frenchPhoneRegex (starts +336 / +337 / 06 or 06)
        if (frenchPhoneRegex.test(cell)) {
          phoneNumbers.push(cell);
        } else {
          // Normalize the number and check strict regex
          const normalizedNumber = cell.replace(/\D/g, ""); // Remove non-digit characters
          if (strictFrenchPhoneRegex.test(normalizedNumber)) {
            // check if starts with 6 or 7 and has exactly 9 numberss
            phoneNumbers.push(`0${normalizedNumber}`);
          }
        }
      }
    }
    return phoneNumbers;
  }

  public async pushExternalNumbers(userID: string, phoneNumbers: string[]): Promise<void> {

    // S3 push function to the user ID bucket, the phoneNumbers

    return
  }
}
