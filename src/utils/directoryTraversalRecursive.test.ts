import { directoryTraversalRecursive } from "./directoryTraversalRecursive";

describe("Calling directoryTraversalRecursive function to recursively traverse subfolders inside a directory", () => {
  it("Should return an array of json files from the directory and all is subfolders", () => {
    const files = directoryTraversalRecursive("./src/mocks/mocks");
    expect(files.length).toEqual(3);
  });

  it("Should throw error when providing incorrect directory as the function's argurment", () => {
    expect(() => directoryTraversalRecursive("./mock")).toThrow(
      "No such directory"
    );
  });
});
