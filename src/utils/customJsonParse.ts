export const customJsonParse = (str: string) => {
  try {
    const obj = JSON.parse(str);
    if (typeof obj === "object") return obj;
    return null;
  } catch (err) {
    return null;
  }
};
