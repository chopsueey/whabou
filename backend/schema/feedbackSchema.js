const stringLength = { type: "string", minLength: 2, maxLength: 30 };


// FEEDBACK SCHEMA *************************************************************************************************************************
export const feedbackPostSchema = {
  type: "object",
  properties: {
    feedback: stringLength,
  },
  required: ["feedback"],
  errorMessage: {
    properties: {
      feedback:
        "The feedback must consist of at least 5 characters and no more than 1000 characters!",
    },
  },
  additionalProperties: false,
};

export const feedbackGetSchema = {
  type: "object",
  additionalProperties: false,
};
