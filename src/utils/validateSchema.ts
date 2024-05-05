import { Validator } from "jsonschema";

const validator = new Validator();

const JsonBoardsSchema = {
  type: "object",
  properties: {
    boards: {
      type: "array",
      items: {
        properties: {
          name: { type: "string" },
          vendor: { type: "string" },
          core: { type: "string" },
          has_wifi: { type: "boolean" },
        },
        required: ["name", "vendor", "core", "has_wifi"],
      },
    },
  },
  required: ["boards"],
};

export const validateSchema = (data: object) => {
  return validator.validate(data, JsonBoardsSchema).valid;
};
