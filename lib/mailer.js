import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// The 60-second resend wait is enforced in lib/otp.js before a code is made,
// so this function only delivers the email.
export async function sendOTP(email, otp) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Apex Ship verification code",
    text: `Your verification code is: ${otp}\n\nThis code expires in 5 minutes and works once.\n\nIf you didn't request this code, you can ignore this email.`,
  });
}
