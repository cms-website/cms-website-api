import { env } from "src/configs";
import * as nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: env.mailConfig.MAILING_USER,
      pass: env.mailConfig.MAILING_PASS
    }
  });
  export default transporter