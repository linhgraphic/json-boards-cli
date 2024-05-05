import { validateSchema } from "./validateSchema";

const mockValidSchemaData = {
  boards: [
    {
      name: "Low_Power",
      vendor: "Tech Corp.",
      core: "Cortex-M0+",
      has_wifi: false,
    },
  ],
};

const mockInvalidSchemaData = {
  invalidBoards: [
    {
      name: "Low_Power",
      vendor: "Tech Corp.",
      core: "Cortex-M0+",
      has_wifi: false,
    },
  ],
};

describe("Calling validateSchema to check if data has correct json-boards schema", () => {
  it("Should return true on data of valid json-boards schema", () => {
    const result = validateSchema(mockValidSchemaData);
    expect(result).toEqual(true);
  });

  it("Should return false on data of invalid json-boards schema", () => {
    const result = validateSchema(mockInvalidSchemaData);
    expect(result).toEqual(false);
  });
});
