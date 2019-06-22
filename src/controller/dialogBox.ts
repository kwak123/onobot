export default {
  attachments: [
    {
      actions: [
        {
          name: "no",
          text: "No",
          type: "button",
          value: "no",
        },
        {
          name: "yes",
          style: "primary",
          text: "Yes",
          type: "button",
          value: "yes",
        },
      ],
      attachment_type: "default",
      callback_id: "birthday",
      color: "#3AA3E3",
      fallback: "Learn to date, loser.",
      text: "Is this the correct date?",
    },
  ],
  text: "Is this the correct birthday?",
};
