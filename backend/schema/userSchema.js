const stringLength = { type: "string", minLength: 2, maxLength: 30 };


// USER SCHEMA*************************************************************************************************************************
export const userPostSchema = {
  type: "object",
  properties: {
    name: stringLength,
    userName: stringLength,
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["name", "userName", "email", "password"],
  errorMessage: {
    properties: {
      name: "The name must be between 2 and 30 characters long!",
      userName: "The name must be between 2 and 30 characters long!",
      email: "The email must be between 2 and 30 characters long!",
      password: "The password must be at least 8 characters long!",
    },
  },
  additionalProperties: false,
};

export const userGetSchema = {
  type: "object",
  additionalProperties: false,
};
