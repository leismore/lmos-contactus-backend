/**
 * app.locals: {
 *     mailTransporter: nodemailer.Transporter
 * }
 */

import express from 'express';
import { get_mail_transporter } from './lib/get_mail_transporter.js';
import config from './config.json' with { type: 'json' };

// message_send
import {
  message_send_handler1,
  message_send_handler2
} from './message_send/index.js';

// app init
const app = express();
app.use(express.json());
app.locals.mailTransporter = get_mail_transporter();

// message_send
app.post( config.routes.messageSend.path,
          message_send_handler1,
          message_send_handler2
);

// start server
app.listen(config.app.port, () => {
  console.log(`${config.app.name} is running at http://localhost:${config.app.port}`);
});
