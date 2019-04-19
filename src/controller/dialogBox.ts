export default {
  text: 'Is this the correct birthday?',
  attachments: [
    {
      text: 'Is this the correct date?',
      fallback: 'Learn to date, loser.',
      callback_id: 'birthday',
      color: '#3AA3E3',
      attachment_type: 'default',
      actions: [
        {
          name: 'no',
          text: 'No',
          type: 'button',
          value: 'no'
        },
        {
          name: 'yes',
          text: 'Yes',
          style: 'primary',
          type: 'button',
          value: 'yes'
        },
      ],
    },
  ],
};
