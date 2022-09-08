const addStudentSchema = {
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
    building: {
      type: 'string',
    },
    room: {
      type: 'string',
    },
    bed: {
      type: 'string',
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
  addStudentSchema,
};
