import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/api/send-email', async (req, res) => {
    const { name, email, subject, msg } = req.body;

    if (!name || !email || !msg) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    // Set up Nodemailer transporter for Gmail
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS, // App Password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`, // Gmail SMTP forces the authenticated account as the sender
        to: process.env.RECEIVER_EMAIL,
        replyTo: email, // Allows direct replying to the user
        subject: subject || `New message from ${name} (Portfolio Contact)`,
        text: `New Contact Submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${msg}`,
        html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 24px; line-height: 1.6; max-width: 600px; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
        <h2 style="color: #4f46e5; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-top: 0; font-size: 20px; font-weight: 700;">New Contact Form Message</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 100px;">From:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Subject:</td>
            <td style="padding: 8px 0; color: #0f172a;">${subject || 'No Subject'}</td>
          </tr>
        </table>
        <div style="background-color: #f8fafc; padding: 18px; border-radius: 12px; border-left: 4px solid #4f46e5; font-size: 15px;">
          <p style="margin: 0; color: #334155; white-space: pre-wrap;">${msg}</p>
        </div>
        <div style="margin-top: 24px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          Sent from your Portfolio contact form
        </div>
      </div>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('SMTP Error:', error);
        return res.status(500).json({ success: false, message: 'Failed to send message via SMTP server.', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});