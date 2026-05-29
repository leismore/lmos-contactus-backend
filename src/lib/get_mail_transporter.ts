/**
 * Initializes Nodemailer transporter.
 */

import nodemailer from 'nodemailer';
import config from '../config.json' with { type: 'json' };
import cred   from '../credential.json' with { type: 'json' };

function get_mail_transporter(): nodemailer.Transporter {

    const transporter = nodemailer.createTransport({

        host   : config.nodeMailer.transporter.host,
        port   : Number(config.nodeMailer.transporter.port),
        secure : config.nodeMailer.transporter.secure,
        auth: {
            user: cred.nodeMailer.user,
            pass: cred.nodeMailer.password
        }

    });

    return transporter;
}

export { get_mail_transporter };
