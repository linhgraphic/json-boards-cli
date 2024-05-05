import fs from "node:fs";
import path from "path";

export const directoryTraversalRecursive = (
  directory: string,
  files: string[] = []
): string[] => {
  try {
    if (directory[directory.length - 1] === "/")
      directory = directory.substring(0, directory.length - 1);

    const currPaths = fs.readdirSync(directory);
    for (let currPath of currPaths) {
      const filePath = path.join(directory, currPath);
      const fileStat = fs.statSync(filePath);
      if (fileStat.isFile() && path.parse(filePath).ext === ".json") {
        files.push(filePath);
      } else if (fileStat.isDirectory()) {
        files = directoryTraversalRecursive(filePath, files);
      }
    }
    return files;
  } catch (err) {
    throw new Error("No such directory");
  }
};
