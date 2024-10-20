// Import required modules
const formData = require('form-data');
const Mailgun = require('mailgun.js');

// Initialize Mailgun
const mailgun = new Mailgun(formData);

// Create a Mailgun client with your API key
const mg = mailgun.client({
  username: 'api',
  key: '780e5232d6abb44f5d03d8900ccb89ed-d010bdaf-29f18504',
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  try {
    const response = await mg.messages.create(
      'sandboxd5a70229fbe2468bb8e848221ed6577e.mailgun.org',
      {
        from: 'Excited User <mailgun@sandboxd5a70229fbe2468bb8e848221ed6577e.mailgun.org>', // Replace with your sender email
        to: [to],
        subject: subject,
        text: text,
        html: html,
      }
    );

    console.log('Email sent:', response);
    return response; // Return response for further processing if needed
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Propagate error for handling elsewhere
  }
};

// Function to send a purchase request to the admin
const requestApprovalFromAdmin = async (message) => {
  const adminEmail = 'tharinduimalka915@gmail.com'; // Replace with the actual admin email
  const subject = 'Purchase Request Approval Needed';

  try {
    await sendEmail(adminEmail, subject, message, `<h1>${message}</h1>`); // Sending HTML format
    console.log('Purchase request sent to admin');
  } catch (error) {
    console.error('Failed to send purchase request:', error);
  }
};

// Example usage
const testEmailSending = async () => {
  const message =
    'A user is trying to make a purchase of Rs. 7000 for Product XYZ.';
  await requestApprovalFromAdmin(message);
};

// Execute the test
testEmailSending();

module.exports = requestApprovalFromAdmin;
