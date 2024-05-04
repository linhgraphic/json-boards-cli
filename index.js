import fs from "node:fs";
import path from "path";
import { validateSchema } from "./utils/validateSchema.js";
import { customJsonParse } from "./utils/customJsonParse.js";
import { directoryTraversalRecursive } from "./utils/directoryTraversalRecursive.js";

const fsp = fs.promises;

export const jsonBoardExport = async (directory) => {
  try {
    let data;
    let vendors = new Set();
    const boardMap = new Map();
    const validJsonFiles = [];

    const files = directoryTraversalRecursive(directory);

    for (let filePath of files) {
      const jsonData = await fsp.readFile(filePath, { encoding: "utf8" });
      const content = customJsonParse(jsonData);
      if (!content) continue;
      if (!validateSchema(content)) continue;

      validJsonFiles.push(filePath);
      for (let board of content.boards) {
        boardMap.set(JSON.stringify(board), board);
        vendors.add(board.vendor);
      }
    }

    for (let value of boardMap.values()) {
      if (data?.boards) data.boards.push(value);
      else data = { boards: [value] };
    }

    data.boards.sort((a, b) => {
      if (a.vendor.localeCompare(b.vendor) === 0)
        return a.name.localeCompare(b.name);
      return a.vendor.localeCompare(b.vendor);
    });

    data._metadata = {
      total_vendors: vendors.size,
      total_boards: data.boards.length,
    };

    if (!data) {
      console.error(
        "No data to output. Please check input files for invalid data schema"
      );
      return;
    }

    const outputDir = directory + "/output";
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const outputFilePath = path.join(outputDir, "output.json");
    fsp.writeFile(outputFilePath, JSON.stringify(data), {
      encoding: "utf8",
    });
    console.log("Success. The files below exported");
    validJsonFiles.forEach((file) => console.log(`${file}`));
  } catch (err) {
    console.error(err.message);
    return;
  }
};
