const stringLength = { type: "string", minLength: 2, maxLength: 30 };

export const profilePostSchema = {
  type: "object",
  properties: {
    userName: stringLength,
    country: stringLength,
    birthYear: { type: "number" },
  },
  required: ["userName", "country", "birthyear"],
  errorMessage: {
    properties: {
      userName: "Der Username muss zwischen 2 und 30 Zeichen lang sein!",
      country: "Bitte machen Sie Angaben zu Ihrem Wohnort",
      birthYear: "Das Alter muss mindestens 12 sein!",
    },
  },
  additionalProperties: false,
};

export const profileGetSchema = {
  type: "object",
  additionalProperties: false,
};
