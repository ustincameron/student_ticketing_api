const addTicketCommentSchema = {
  type: 'object',
  properties: {
    ticketID: {
      type: 'string',
    },
    authorID: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
  },
  required: [
    'ticketID',
    'authorID',
    'message',
  ],
  additionalProperties: false,
};

export {
  addTicketCommentSchema,
};
