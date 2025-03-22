import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import { SendEmailDto } from './send-email.dto';

@Injectable()
export class EmailService {
  private mailTransport: Transporter;

  constructor(private configService: ConfigService) {
    this.mailTransport = createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('EMAIL_HOST_PASS'),
      },
    });
  }

  async sendEmail(data: SendEmailDto): Promise<{ success: boolean } | null> {
    const { sender, recipients, subject, html, text } = data;

    const mailOptions: SendMailOptions = {
      subject,
      html,
      text,
      from: sender ?? {
        name: this.configService.get('MAIL_SENDER_NAME_DEFAULT'),
        address: this.configService.get('MAIL_SENDER_DEFAULT'),
      },
      to: recipients,
    };

    try {
      await this.mailTransport.sendMail(mailOptions);
      return { success: true };
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }

  confirmEmailTemplate(
    userName: string,
    otp: string,
    hashLink: string,
  ): string {
    return `
      <p>Hi ${userName}!</p><p>Please, confirm your bro account. <br /> Your <strong>link</strong>: <a>${hashLink}</a> <br /> Your <strong>CODE: ${otp}</strong>.</p>
    `;
  }
}
