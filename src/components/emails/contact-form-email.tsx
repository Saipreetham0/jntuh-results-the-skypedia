interface EmailProps {
  name: string;
  email: string;
  message: string;
}

const ContactFormEmail = ({ name, email, message }: EmailProps): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Message</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 5px;
          }
          .content {
            background-color: #ffffff;
            padding: 20px;
            margin-top: 20px;
            border: 1px solid #e9ecef;
            border-radius: 5px;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
          }
          .divider {
            border-top: 1px solid #e9ecef;
            margin: 20px 0;
          }
          @media only screen and (max-width: 600px) {
            .container {
              width: 100% !important;
              padding: 10px !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; color: #007bff;">New Contact Form Message</h1>
          </div>

          <div class="content">
            <h2 style="color: #495057;">Contact Details:</h2>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>

            <div class="divider"></div>

            <h2 style="color: #495057;">Message:</h2>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div class="footer">
            <p>This email was sent from the contact form on JNTUH Results website</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default ContactFormEmail;