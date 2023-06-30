const stringLength = { type: "string", minLength: 2, maxLength: 30 };


// LIKE SCHEMA*************************************************************************************************************************
export const likePostSchema = {
  type: "object",
  properties: {
    user: stringLength,
    question: stringLength,
  },
  required: ["user", "question"],
  errorMessage: {
    properties: {
      user: "The name must be between 2 and 30 characters long!",
      question:
        "The question must consist of at least 5 characters and no more than 1000 characters!",
    },
  },
  additionalProperties: false,
};

export const likeGetSchema = {
  type: "object",
  additionalProperties: false,
};
