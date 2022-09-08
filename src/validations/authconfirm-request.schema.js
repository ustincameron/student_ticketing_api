const authConfirmSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
    otp: {
      type: 'string',
    },
  },
  required: [
    'otp',
  ],
  additionalProperties: true,
};

export {
  authConfirmSchema,
};
