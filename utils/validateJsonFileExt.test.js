import { validateJsonFileExt } from "./validateJsonFileExt";

describe("Calling validateJsonFileExt on a file path to check if it is a correct file path to a json file", () => {
  it("Should return true for './mocks/mock.json'", () => {
    const result = validateJsonFileExt("./mocks", "mockValidSchema1.json");
    expect(result).toBe(true);
  });

  it("Should return true for './mocks/mock.js'", () => {
    const result = validateJsonFileExt("./mocks", "mock.js");
    expect(result).toBe(false);
  });
});
