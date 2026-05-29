/**
 * Request validation
 */

import { Request, Response, NextFunction } from 'express';
import { CUError } from '../../lib/CUError.js';
import { PhoneNumber } from '../../lib/PhoneNumber.js';
import { Message, MessagePreferredMethod } from '../../lib/Message.js';
import config from '../../config.json' with { type: 'json' };

function handler1(req: Request, res: Response, next: NextFunction): void {

    let name: string;
    let email: string;
    let phoneNumber: PhoneNumber | undefined;
    let message: string;
    let preferredMethod: MessagePreferredMethod;

    let messageObj: Message;

    // Check media type and request body
    if ( !req.is('application/json')  ||
         typeof req.body !== 'object' ||
         req.body === null )
    {
        res.status(415).json({ error: 'invalid_json' });
        next('route');
        return;
    }

    // Name
    name = req.body.name;

    // Email
    email = req.body.email;

    // Phone
    if ( req.body.phone === null ) {
        phoneNumber = undefined;
    } else if ( typeof req.body.phone         === 'object' &&
                req.body.phone                !== null     &&
                typeof req.body.phone.country === 'string' &&
                typeof req.body.phone.number  === 'string' )
    {
        try {
            phoneNumber = new PhoneNumber(req.body.phone.country, req.body.phone.number);
        } catch (err) {
            res.status(415).json({ error: 'invalid_phone' });
            next('route');
            return;
        }
    } else {
        res.status(415).json({ error: 'invalid_phone' });
        next('route');
        return;
    }

    if ( config.phone.required && phoneNumber === undefined ) {
        res.status(415).json({ error: 'invalid_phone' });
        next('route');
        return;
    }

    // Message
    message = req.body.message;

    // Preferred Method
    if ( req.body.preferredMethod === 'email' ) {
        preferredMethod = MessagePreferredMethod.Email;
    } else if ( req.body.preferredMethod === 'phone' ) {
        preferredMethod = MessagePreferredMethod.Phone;
    } else {
        res.status(415).json({ error: 'invalid_preferred_method' });
        next('route');
        return;
    }

    // Create Message object
    try {
        messageObj = new Message({
            name            : name,
            email           : email,
            phoneNumber     : phoneNumber,
            message         : message,
            preferredMethod : preferredMethod
        });
    } catch (err) {
        if ( err instanceof CUError ) {

            let errorMessage: string;

            switch (err.error.code) {
                case '9':
                    errorMessage = 'generic_error';
                    break;
                case '10':
                    errorMessage = 'invalid_name';
                    break;
                case '11':
                    errorMessage = 'invalid_email';
                    break;
                case '12':
                    errorMessage = 'invalid_phone';
                    break;
                case '13':
                    errorMessage = 'invalid_message';
                    break;
                case '14':
                    errorMessage = 'invalid_preferred_method';
                    break;
                default:
                    errorMessage = 'generic_error';
            }

            res.status(415).json({ error: errorMessage });
            next('route');
            return;

        } else {

            let error: CUError;

            if ( config.app.debug ) {
                error = new CUError(
                    { code: '1', message: 'unknown' },
                    {
                        statusCode: '500',
                        headers: [{name: 'Content-Type', value: 'application/json'}],
                        body: { error: 'generic_error' }
                    }, err instanceof Error ? err : new Error(String(err)));
            } else {
                error = new CUError(
                    { code: '1', message: 'unknown' },
                    {
                        statusCode: '500'
                    }, err instanceof Error ? err : new Error(String(err)));
            }

            next(error);
            return;

        }
    }

    res.locals.message = messageObj;
    next();
}

export { handler1 };
