import fs from "fs";
import { customJsonParse } from "./customJsonParse";

const mockValidJson = fs.readFileSync("./mocks/mockValidSchema1.json");
const mockValidParsedJsonData = {
  boards: [
    {
      name: "Low_Power",
      vendor: "Tech Corp.",
      core: "Cortex-M0+",
      has_wifi: false,
    },
    {
      name: "B7-400X",
      vendor: "Boards R Us",
      core: "Cortex-M7",
      has_wifi: true,
    },
  ],
};

const mockInvalidParsedJsonData = "[This is invalid Json data]";

describe("Calling customJsonParse", () => {
  it("Should parse and return js object for valid json data", () => {
    const data = customJsonParse(mockValidJson);
    expect(data).toEqual(mockValidParsedJsonData);
  });

  it("Should return null for invalid json data", () => {
    const data = customJsonParse(mockInvalidParsedJsonData);
    expect(data).toEqual(null);
  });
});
