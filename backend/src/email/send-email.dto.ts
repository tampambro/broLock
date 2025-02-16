import { Address } from 'nodemailer/lib/mailer';

export class SendEmailDto {
  recipients: Address[];
  subject: string;
  html: string;
  sender?: Address;
  text?: string;
}
