import express from 'express';
import nodemailer from 'nodemailer';
import { bookingValidation, handleValidation } from '../middleware/validation.js';
import formLimiter from '../middleware/rateLimit.js';

const router = express.Router();

/**
 * POST /api/book
 * Handles booking request submissions and sends email notification
 */
router.post('/', formLimiter, bookingValidation, handleValidation, async (req, res) => {
  try {
    const { name, email, phone, service, date, time, message } = req.body;

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"MBC4 Fitness Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Booking Request — ${name} — ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #E0E0E0; padding: 32px; border-radius: 12px;">
          <h1 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 16px;">
            🗓️ New Booking Request
          </h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #888; width: 140px;">Name</td>
              <td style="padding: 12px 0; color: #fff; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #D4AF37;">${email}</a></td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 12px 0; color: #888;">Phone</td>
              <td style="padding: 12px 0; color: #fff;">${phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 0; color: #888;">Service</td>
              <td style="padding: 12px 0; color: #D4AF37; font-weight: 600;">${service}</td>
            </tr>
            ${date ? `<tr>
              <td style="padding: 12px 0; color: #888;">Preferred Date</td>
              <td style="padding: 12px 0; color: #fff;">${new Date(date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>` : ''}
            ${time ? `<tr>
              <td style="padding: 12px 0; color: #888;">Preferred Time</td>
              <td style="padding: 12px 0; color: #fff;">${time}</td>
            </tr>` : ''}
          </table>
          ${message ? `
            <div style="margin-top: 24px; padding: 16px; background: #161616; border-left: 3px solid #D4AF37; border-radius: 4px;">
              <p style="color: #888; margin: 0 0 8px;">Additional Notes:</p>
              <p style="color: #E0E0E0; margin: 0; line-height: 1.6;">${message}</p>
            </div>
          ` : ''}
          <p style="margin-top: 32px; color: #666; font-size: 12px; text-align: center;">
            Sent from MBC4 Fitness website booking form
          </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Booking request received! Tyhe will confirm your session within 24 hours.',
    });
  } catch (error) {
    console.error('Booking form error:', error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try calling us at +44 7723 622065 or try again later.',
    });
  }
});

export default router;
