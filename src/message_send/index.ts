/**
 * A RESTFul API for emailing messages to the administrator.
 * 
 * Endpoint   : /api/message-send
 * Method     : POST
 * Media Type : application/json
 * 
 * Request:
 * {
 *     name            : string
 *     email           : string
 * 
 *     phone           : {
 *       country       : string
 *       number        : string
 *     } | null
 * 
 *     message         : string
 *     preferredMethod : "email" | "phone"
 * }
 * 
 * When config.phone.required = true, the Phone field can NOT be null.
 * 
 * Responses:
 * 
 * 204 No Content - Message sent successfully.
 * 
 * 415 Unsupported Media Type
 * {
 *     error: generic_error   |
 *            invalid_json    |
 *            invalid_name    |
 *            invalid_email   |
 *            invalid_phone   |
 *            invalid_message |
 *            invalid_preferred_method
 * }
 * 
 * 500 Internal Server Error
 * {
 *     error: generic_error |
 *            email_server_error
 * }
 * 
 * When config.app.debug = false, no body will be sent with 500 response.
 * 
 * ---
 * 
 * res.locals: {
 *     message: Message
 * }
 */

import { handler1 } from './handlers/handler1.js';
import { handler2 } from './handlers/handler2.js';

export {
    handler1 as message_send_handler1,
    handler2 as message_send_handler2
};
