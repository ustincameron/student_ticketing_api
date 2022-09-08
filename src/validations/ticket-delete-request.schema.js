const deleteTicketSchema = {
  type: 'object',
  properties: {
    ticketID: {
      type: 'string',
    },
  },
  required: [
    'ticketID',
  ],
  additionalProperties: false,
};

export {
  deleteTicketSchema,
};
