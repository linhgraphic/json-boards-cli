import fs from "node:fs";
import path from "path";

export const validateJsonFileExt = (folderPath, fileName) => {
  const filepath = path.resolve(folderPath, fileName);
  return (
    fs.lstatSync(filepath).isFile() && path.parse(fileName).ext === ".json"
  );
};
