const emailjs = require('emailjs-com');

// Standalone function to send a purchase request to the admin
const requestApprovalFromAdmin = async (message) => {
  // EmailService class declaration inside the function
  class EmailService {
    constructor(userID) {
      // Initialize EmailJS with the provided User ID
      emailjs.init(userID); // Replace with your EmailJS User ID
    }

    // Method to send an email
    async sendEmail(serviceID, templateID, to, subject, text) {
      const templateParams = {
        to_name: to,
        subject: subject,
        message: text,
        from_name: 'StockPulse',
      };

      try {
        const response = await emailjs.send(
          serviceID,
          templateID,
          templateParams
        );
        console.log('Email sent:', response);
        return response; // Return response for further processing if needed
      } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Propagate error for handling elsewhere
      }
    }
  }

  const userID = 'cEMxEvNkIrV2wwDS7'; // Replace with your EmailJS User ID
  const emailService = new EmailService(userID);

  const subject = 'Purchase Request Approval Needed';

  try {
    const adminEmail = 'StockPulse Stock Manager'; // Replace with the actual admin email
    console.log(message);
    await emailService.sendEmail(
      'service_sebvfxq', // Replace with your EmailJS service ID
      'template_9v76b5z', // Replace with your EmailJS template ID
      adminEmail,
      subject,
      message
    );
    console.log('Purchase request sent to admin');
  } catch (error) {
    console.error('Failed to send purchase request:', error);
  }
};

module.exports = requestApprovalFromAdmin;
