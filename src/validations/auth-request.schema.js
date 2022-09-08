const authInitiateSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
    mode: {
      type: 'string',
      enum: ['student', 'staff'],
    },
  },
  required: [
    'mode',
  ],
  additionalProperties: true,
};

export {
  authInitiateSchema,
};
