// src/email/email.service.ts

import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrevoClient } from '@getbrevo/brevo';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly brevo: BrevoClient;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('BREVO_API_KEY') || '';

    if (!apiKey) {
      this.logger.warn('BREVO_API_KEY is not configured in environment variables.');
    }

    this.brevo = new BrevoClient({
      apiKey: apiKey,
    });
  }

  /**
   * Sends 6-digit OTP email via Brevo SDK.
   */
  async sendVerificationOtp(toEmail: string, fullName: string, otp: string): Promise<void> {
    const senderEmail = this.configService.get<string>('BREVO_SENDER_EMAIL', 'noreply@buniyaadec.com');
    const senderName = this.configService.get<string>('BREVO_SENDER_NAME', 'BuniyaadEC');

    try {
      await this.brevo.transactionalEmails.sendTransacEmail({
        sender: {
          email: senderEmail,
          name: senderName,
        },
        to: [
          {
            email: toEmail,
            name: fullName,
          },
        ],
        subject: `${otp} is your BuniyaadEC verification code`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #2c3e50;">Verify Your Email Address</h2>
            <p>Hello <strong>${fullName}</strong>,</p>
            <p>Thank you for registering with BuniyaadEC. Use the following 6-digit verification code to complete your registration:</p>
            <div style="background-color: #f4f6f8; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1a73e8; margin: 20px 0; border-radius: 6px;">
              ${otp}
            </div>
            <p>This code will expire in <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777777;">This is an automated message from BuniyaadEC. Please do not reply.</p>
          </div>
        `,
      });

      this.logger.log(`Verification OTP email successfully dispatched to ${toEmail}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email via Brevo to ${toEmail}`, error);
      throw new InternalServerErrorException('Failed to dispatch email verification code.');
    }
  }

  /**
   * Sends password reset token email via Brevo SDK.
   */
  async sendPasswordResetEmail(toEmail: string, token: string): Promise<boolean> {
    const senderEmail = this.configService.get<string>('BREVO_SENDER_EMAIL', 'noreply@buniyaadec.com');
    const senderName = this.configService.get<string>('BREVO_SENDER_NAME', 'BuniyaadEC');

    try {
      await this.brevo.transactionalEmails.sendTransacEmail({
        sender: {
          email: senderEmail,
          name: senderName,
        },
        to: [
          {
            email: toEmail,
          },
        ],
        subject: 'BuniyaadEC Password Reset Request',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #2c3e50;">Reset Your Password</h2>
            <p>You requested a password reset for your BuniyaadEC account.</p>
            <p>Use the following token to reset your password:</p>
            <div style="background-color: #f4f6f8; padding: 15px; text-align: center; font-size: 20px; font-weight: bold; word-break: break-all; color: #1a73e8; margin: 20px 0; border-radius: 6px;">
              ${token}
            </div>
            <p>This token will expire in <strong>15 minutes</strong>. If you did not request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777777;">This is an automated message from BuniyaadEC. Please do not reply.</p>
          </div>
        `,
      });

      this.logger.log(`Password reset email successfully dispatched to ${toEmail}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send password reset email via Brevo to ${toEmail}`, error);
      throw new InternalServerErrorException('Failed to dispatch password reset email.');
    }
  }
}