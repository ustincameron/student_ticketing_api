const addTicketCategorySchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    orderBy: {
      type: 'integer',
    },
    active: {
      type: 'boolean',
    },
  },
  required: [
    'name',
    'description',
    'orderBy',
    'active',
  ],
  additionalProperties: false,
};

export {
  addTicketCategorySchema,
};
