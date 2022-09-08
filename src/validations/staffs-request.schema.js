const addStaffSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    admin: {
      type: 'boolean',
    },
    active: {
      type: 'boolean',
    },
  },
  required: [
    'firstName',
    'lastName',
  ],
  additionalProperties: true,
};

export {
  addStaffSchema,
};
