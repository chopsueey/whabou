const stringLength = { type: "string", minLength: 2, maxLength: 30 };


// QUESTION SCHEMA*************************************************************************************************************************
export const questionPostSchema = {
  type: "object",
  properties: {
    question: stringLength,
  },
  required: ["question"],
  errorMessage: {
    properties: {
      question:
        "The question must consist of at least 5 characters and no more than 1000 characters!",
    },
  },
  additionalProperties: false,
};

export const questionGetSchema = {
  type: "object",
  additionalProperties: false,
};
