const stringLength = { type: "string", minLength: 2, maxLength: 30 };

export const feedbackPostSchema = {
  type: "object",
  properties: {
    feedback: stringLength,
  },
  required: ["feedback"],
  errorMessage: {
    properties: {
      feedback:
        "Das Feedback muss aus mindestens 5 Zeichen und nicht mehr als 1000 Zeichen bestehen!",
    },
  },
  additionalProperties: false,
};

export const feedbackGetSchema = {
  type: "object",
  additionalProperties: false,
};
