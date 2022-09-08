const deleteTicketCategorySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
  },
  required: [
    'id',
  ],
  additionalProperties: false,
};

export {
  deleteTicketCategorySchema,
};
