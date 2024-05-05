import fs from "node:fs";
import path from "path";
import { validateSchema } from "./utils/validateSchema";
import { customJsonParse } from "./utils/customJsonParse";
import { directoryTraversalRecursive } from "./utils/directoryTraversalRecursive";
import { JsonBoardsExportSchema } from "./types";

export const jsonBoardExport = (directory: string) => {
  try {
    let data: JsonBoardsExportSchema | null = null;
    let vendors = new Set();
    const boardMap = new Map();
    const validJsonFiles: string[] = [];

    const files = directoryTraversalRecursive(directory);
    if (!files.length) throw new Error("No json boards file found");

    for (let filePath of files) {
      const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
      const content = customJsonParse(jsonData);
      if (!content) continue;
      if (!validateSchema(content)) continue;
      validJsonFiles.push(filePath);
      {
        for (let board of content.boards) {
          boardMap.set(JSON.stringify(board), board);
          vendors.add(board.vendor);
        }
      }
    }

    for (let value of boardMap.values()) {
      if (data?.boards) {
        data.boards.push(value);
        data._metadata.total_boards++;
      } else
        data = {
          boards: [value],
          _metadata: {
            total_vendors: vendors.size,
            total_boards: 1,
          },
        };
    }

    if (!data)
      throw new Error(
        "No data to output. Please check input files for invalid data schema"
      );

    data.boards.sort((a, b) => {
      if (a.vendor.localeCompare(b.vendor) === 0)
        return a.name.localeCompare(b.name);
      return a.vendor.localeCompare(b.vendor);
    });

    const outputDir = directory + "/output";
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const outputFilePath = path.join(outputDir, "output.json");
    fs.writeFileSync(outputFilePath, JSON.stringify(data), {
      encoding: "utf8",
    });

    console.log("Success. The files below exported");
    validJsonFiles.forEach((file) => console.log(`${file}`));
  } catch (err: any) {
    console.log(err.message);
    return;
  }
};
