const stringLength = { type: "string", minLength: 2, maxLength: 30 };

export const profilePostSchema = {
  type: "object",
  properties: {
    userName: stringLength,
    nationality: stringLength,
    age: { type: "number" },
  },
  required: ["userName", "nationality", "age"],
  errorMessage: {
    properties: {
      userName: "Der Username muss zwischen 2 und 30 Zeichen lang sein!",
      nationality: "Wählen Sie eine Option aus der Liste",
      age: "Das Alter muss mindestens 12 sein!",
    },
  },
  additionalProperties: false,
};

export const profileGetSchema = {
  type: "object",
  additionalProperties: false,
};
