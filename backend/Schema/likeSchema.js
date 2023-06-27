const stringLength = { type: "string", minLength: 2, maxLength: 30 };

export const likePostSchema = {
  type: "object",
  properties: {
    user: stringLength,
    question: stringLength,
  },
  required: ["user", "question"],
  errorMessage: {
    properties: {
      user: "Der Name muss zwischen 2 und 30 Zeichen lang sein!",
      question: "Die Frage muss aus mindestens 5 Zeichen und nicht mehr als 1000 Zeichen bestehen!",
    },
  },
  additionalProperties: false,
};

export const likeGetSchema = {
  type: "object",
  additionalProperties: false,
};
