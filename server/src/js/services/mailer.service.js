const nodemailer = require("nodemailer");

const $NodeMailer = {
  async sendTwoFactorAuthEmail(email, code) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      const mailOptions = {
        from: "no-reply@kirja.io",
        to: email,
        subject: "Kirja Two Factor Authentication",
        html: 
        `<html>
          <head>
              <title>2FA Code</title>
              <style>
                  .email-container {
                      max-width: 600px;
                      margin: auto;
                      border: 1px solid #ddd;
                      font-family: Arial, sans-serif;
                  }
          
                  .email-header {
                      background-color: #f4f4f4;
                      padding: 20px;
                      text-align: center;
                  }
          
                  .email-body {
                      padding: 20px;
                      text-align: center;
                  }
          
                  .email-footer {
                      background-color: #f4f4f4;
                      padding: 10px;
                      text-align: center;
                      font-size: 12px;
                  }
          
                  .code {
                      font-size: 24px;
                      color: #333;
                      font-weight: bold;
                      border: 1px solid #ddd;
                      display: inline-block;
                      padding: 10px;
                      margin: 20px 0;
                  }
              </style>
          </head>
          <body>
              <div class="email-container">
                  <div class="email-header">
                      <h2>Your 2FA Code</h2>
                  </div>
                  <div class="email-body">
                      <p>Hello,</p>
                      <p>Your Two-Factor Authentication (2FA) code for Kirja is:</p>
                      <div class="code">${code}</div>
                      <p>This code will expire in 10 minutes.</p>
                  </div>
                  <div class="email-footer">
                      If you did not request this code, please ignore this email or contact support.
                  </div>
              </div>
          </body>
        </html>`,
      };
      const result = await transporter.sendMail(mailOptions);
      return result;
    }
    catch (e) {
      console.error(e);
      return e;
    }
  },
  async sendResetPasswordEmail(email, resetToken) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      const mailOptions = {
        from: "no-reply@kirja.io",
        to: email,
        subject: "OnTrack Password Reset",
        html: `<html>
        <head>
            <title>Password Reset</title>
            <style>
                .email-container {
                    max-width: 600px;
                    margin: auto;
                    border: 1px solid #ddd;
                    font-family: Arial, sans-serif;
                }
    
                .email-header {
                    background-color: #f4f4f4;
                    padding: 20px;
                    text-align: center;
                }
    
                .email-body {
                    padding: 20px;
                    text-align: center;
                }
    
                .email-footer {
                    background-color: #f4f4f4;
                    padding: 10px;
                    text-align: center;
                    font-size: 12px;
                }
    
                .reset-link {
                    font-size: 16px;
                    color: #333;
                    font-weight: bold;
                    text-decoration: none;
                    padding: 10px;
                    display: inline-block;
                    margin: 20px 0;
                    border: 1px solid #ddd;
                    background-color: #e8e8e8;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h2>Password Reset Request</h2>
                </div>
                <div class="email-body">
                    <p>Hello,</p>
                    <p>You have requested to reset your password. Please click on the link below to set a new password:</p>
                    <a href="http://localhost:8080/reset-password/${resetToken}" class="reset-link">Reset Password</a> 
                    <p>This link will expire in 24 hours.</p>
                </div>
                <div class="email-footer">
                    If you did not request a password reset, please ignore this email or contact support.
                </div>
            </div>
        </body>
    </html>
    `,
    // TODO: Change the link above to the production URL
      };
      const result = await transporter.sendMail(mailOptions);
      return result;
    }
    catch (e) {
      console.error(e);
      return e;
    }
  },
};

module.exports = $NodeMailer;