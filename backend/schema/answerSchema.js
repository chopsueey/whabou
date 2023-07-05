const stringLength = { type: "string", minLength: 2, maxLength: 30 };

export const answerPostSchema = {
  type: "object",
  properties: {
    user: stringLength,
    question: stringLength,
  },
  required: ["user", "answer"],
  errorMessage: {
    properties: {
      user: "Der Name muss zwischen 2 und 30 Zeichen lang sein!",
      answer:
        "Geben Sie Ihre Antwort auf die Ja/Nein-Frage, indem Sie auf „Ja“ oder „Nein“ klicken.",
    },
  },
  additionalProperties: false,
};

export const answerGetSchema = {
  type: "object",
  additionalProperties: false,
};
