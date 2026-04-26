import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (to, code) => {
  await transporter.sendMail({
    from: `"Loveline Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    html: `
      <h2>Your OTP Code</h2>
      <p>Your login code is:</p>
      <h1>${code}</h1>
      <p>This code expires in 5 minutes.</p>
    `,
  });
};