import fs from "node:fs";
import path from "path";
import { validateSchema } from "./utils/validateSchema.js";
import { validateJsonFileExt } from "./utils/validateJsonFileExt.js";
import { customJsonParse } from "./utils/customJsonParse.js";

const fsp = fs.promises;

export const jsonBoardExport = async (folderPath) => {
  try {
    let data;
    let vendors = new Set();

    const files = (await fsp.readdir(folderPath)).filter((fileName) =>
      validateJsonFileExt(folderPath, fileName)
    );

    for (let fileName of files) {
      const filePath = path.join(folderPath, fileName);
      const jsonData = await fsp.readFile(filePath, { encoding: "utf8" });
      const content = customJsonParse(jsonData);
      if (!content) continue;
      if (!validateSchema(content)) {
        console.warn(`${filePath} has invalid schema`);
        continue;
      }

      if (data?.boards) data.boards.push(...content.boards);
      else data = { boards: [...content.boards] };

      for (let board of content.boards) {
        vendors.add(board.vendor);
      }
    }

    data.boards.sort((a, b) => a.name.localeCompare(b.name));
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

    const outputDir = folderPath + "/output";
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const outputFilePath = path.join(outputDir, "output.json");
    fsp.writeFile(outputFilePath, JSON.stringify(data), {
      encoding: "utf8",
    });
    console.log("File saved");
  } catch (err) {
    console.error(err.message);
    return;
  }
};
