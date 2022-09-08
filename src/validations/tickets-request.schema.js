const addTicketSchema = {
  type: 'object',
  properties: {
    studentID: {
      type: 'string',
    },
    subject: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
    priority: {
      type: 'integer',
    },
    categoryID: {
      type: 'integer',
    },
  },
  required: [
    'studentID',
    'subject',
    'categoryID',
    'priority',
  ],
  additionalProperties: true,
};

export {
  addTicketSchema,
};
