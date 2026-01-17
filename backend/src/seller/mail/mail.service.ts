// src/seller/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    const user = this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('EMAIL_PASS');

    console.log('Email User:', user);   // ← টেস্টের জন্য
    console.log('Email Pass:', pass ? '***exists***' : 'MISSING'); // ← টেস্টের জন্য

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'tyeamin79@gmail.com',
        pass: 'quyfuifimncigznd',
      },
    });
  }

  async sendApprovalMail(email: string, name: string, shopName: string) {
    await this.transporter.sendMail({
      from: '"E-Shop" <no-reply@eshop.com>',
      to: email,
      subject: 'Your Shop is Approved!',
      html: `<h2>Congratulations ${name}!</h2><p>Your shop <strong>${shopName}</strong> has been approved!</p>`,
    });
  }

  async sendRejectionMail(email: string, name: string, reason: string) {
    await this.transporter.sendMail({
      from: '"E-Shop" <no-reply@eshop.com>',
      to: email,
      subject: 'Shop Registration Rejected',
      html: `<h2>Sorry ${name}</h2><p>Reason: ${reason}</p>`,
    });
  }
}