import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import { SendEmailDto } from './send-email.dto';
import { User } from 'src/user/user.entity';

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

  private async sendEmail(
    data: SendEmailDto,
  ): Promise<{ success: boolean } | null> {
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

  async sendEmailConfirm(
    user: User,
    otp: string,
    linkHash: string,
  ): Promise<void> {
    await this.sendEmail({
      subject: 'BroLock — account confirm',
      recipients: [{ name: user.name, address: user.email }],
      html: this.confirmEmailTemplate(user.name, otp, linkHash),
    });
  }

  async sendNewEmailConfirm(
    otp: string,
    email: string,
    linkHash: string,
  ): Promise<void> {
    await this.sendEmail({
      subject: 'BroLock — account confirm',
      recipients: [{ name: 'Bro', address: email }],
      html: this.confirmEmailTemplate('Bro', otp, linkHash),
    });
  }

  async sendPasswordReset(user: User): Promise<void> {
    await this.sendEmail({
      subject: 'BroLock — reset password',
      recipients: [{ name: user.name, address: user.email }],
      html: this.passwordResetEmailTemplate(user.name, user.resetPasswordToken),
    });
  }

  private confirmEmailTemplate(
    userName: string,
    otp: string,
    hashLink: string,
  ): string {
    return `
      <p>Hi ${userName}!</p><p>Please, confirm your bro account. <br /> Your <strong>link</strong>: <a href="${process.env.MAIL_CONFIRM_LINK}${hashLink}">${process.env.MAIL_CONFIRM_LINK}</a> <br /> Your <strong>CODE: ${otp}</strong>.</p>
    `;
  }

  private passwordResetEmailTemplate(
    userName: string,
    tokenLink: string,
  ): string {
    return `
      <p>Hi ${userName}!</p><p>Here your link for reset password: <a href="${process.env.MAIL_RESET_PASSWORD}${tokenLink}"</p><p>Keep your password strong, your spirit keep calm)))</p>
    `;
  }
}
