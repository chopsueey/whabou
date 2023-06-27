const stringLength = { type: "string", minLength: 2, maxLength: 30 };

export const questionPostSchema = {
  type: "object",
  properties: {
    question: stringLength,
  },
  required: ["question"],
  errorMessage: {
    properties: {
      question:
        "Die Frage muss aus mindestens 5 Zeichen und nicht mehr als 1000 Zeichen bestehen!",
    },
  },
  additionalProperties: false,
};

export const questionGetSchema = {
  type: "object",
  additionalProperties: false,
};
