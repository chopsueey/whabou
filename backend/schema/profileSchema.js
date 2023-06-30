const stringLength = { type: "string", minLength: 2, maxLength: 30 };


// PROFILE SCHEMA*************************************************************************************************************************
export const profilePostSchema = {
  type: "object",
  properties: {
    userName: stringLength,
    country: stringLength,
    birthyear: { type: "number" },
  },
  required: ["userName", "country", "birthyear"],
  errorMessage: {
    properties: {
      userName: "The username must be between 2 and 30 characters long!",
      country: "What is your 'country'? Information not provided.",
      birthyear: "You must be minimum 18 years old!",
    },
  },
  additionalProperties: false,
};

export const profileGetSchema = {
  type: "object",
  additionalProperties: false,
};
