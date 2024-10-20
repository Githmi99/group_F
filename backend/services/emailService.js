const mailjet = require('node-mailjet').connect(
  'f52e0af2cba6feb4a04b102809820060',
  'YOUR_SECRET_KEY'
);

const sendEmail = async (email, subject, text) => {
  try {
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'ndliyanapathirana@gmail.com',
            Name: 'Stock Pulse Inc',
          },
          To: [
            {
              Email: email,
              Name: 'Admin', // Replace with dynamic recipient's name if needed
            },
          ],
          Subject: subject,
          TextPart: text,
        },
      ],
    });

    const result = await request;
    console.log('Email sent:', result.body);
    return result.body;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
