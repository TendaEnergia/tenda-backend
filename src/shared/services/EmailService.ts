import nodemailer, { Transporter } from "nodemailer";
import { config } from "../../../config";

interface SendEmailDTO {
  to: string;
  subject: string;
  htmlBody: string;
}

export class EmailService {
  private static instance: EmailService;
  private transporter: Transporter;

  private constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: Number(config.mail.port),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: config.mail.user,
        pass: config.mail.pass,
      },
    });
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  public async send({ to, subject, htmlBody }: SendEmailDTO): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      html: htmlBody,
    });
  }
}
