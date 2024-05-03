import fs from "node:fs";
import { jsonBoardExport } from ".";

const fsp = fs.promises;

const outputData = {
  boards: [
    {
      name: "B7-400X",
      vendor: "Boards R Us",
      core: "Cortex-M7",
      has_wifi: true,
    },
    {
      name: "D4-200S",
      vendor: "Boards R Us",
      core: "Cortex-M4",
      has_wifi: false,
    },
    {
      name: "Low_Power",
      vendor: "Tech Corp.",
      core: "Cortex-M0+",
      has_wifi: false,
    },
  ],
  _metadata: { total_vendors: 2, total_boards: 3 },
};

describe("Calling jsonBoardExport function", () => {
  it("Should read all json files that have correct json-boards schema in './mocks' directory  and combine the data in to './mocks/output/output.json' file", async () => {
    await jsonBoardExport("./mocks");
    const result = await fsp.readFile("./mocks/output/output.json", {
      encoding: "utf8",
    });
    setTimeout(() => expect(JSON.parse(result)).toEqual(outputData), 1000);
  });
});
