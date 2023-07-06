const stringLength = { type: "string", minLength: 2, maxLength: 30 };

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
      name: "Der Name muss zwischen 2 und 30 Zeichen lang sein!",
      userName: "Der Name muss zwischen 2 und 30 Zeichen lang sein!",
      email: "Das Email  muss zwischen 2 und 30 Zeichen lang sein!",
      password: "Das Password  muss mindestens 8 Zeichen lang sein!",
    },
  },
  additionalProperties: false,
};

export const userGetSchema = {
  type: "object",
  additionalProperties: false,
};
