/**
 * Send email to the administrator.
 * 
 */

import { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import { Message, MessagePreferredMethod } from '../../lib/Message.js';
import { CUError } from '../../lib/CUError.js';
import config from '../../config.json' with { type: 'json' };

async function handler2(req: Request, res: Response, next: NextFunction): Promise<void> {

    const message: Message = res.locals.message;
    const transporter:nodemailer.Transporter = req.app.locals.mailTransporter;

    try {
        const result = await transporter.sendMail({

            from     : config.nodeMailer.envelope.from,
            to       : config.nodeMailer.envelope.to,
            replyTo  : message.email,
            subject  : `[Contact Form] A new message from ${message.name}`,
            text     : (
                `From:      ${message.name}\n` +
                `Email:     ${message.email}\n` +
                `Phone:     ${message.phoneNumber === undefined ? 'N/A' : String(message.phoneNumber)}\n` +
                `Preferred: ${message.preferredMethod === MessagePreferredMethod.Email ? 'Email' : 'Phone'}\n\n` +
                `Message:\n\n` +
                `${message.message}`
            )

        });

        res.sendStatus(204);
        next();
        return;
    } catch (err) {

        let error: CUError;

        if ( config.app.debug ) {
            error = new CUError(
                {code: '23', message: 'nodemailer_send_error'},
                {
                    statusCode: '500',
                    headers: [{name: 'Content-Type', value: 'application/json'}],
                    body: { error: 'email_server_error' }
                },
                err instanceof Error ? err : new Error(String(err))
            );
        } else {
            error = new CUError(
                {code: '23', message: 'nodemailer_send_error'},
                {
                    statusCode: '500'
                },
                err instanceof Error ? err : new Error(String(err))
            );
        }

        next(error);
        return;
    }

}

export { handler2 };
