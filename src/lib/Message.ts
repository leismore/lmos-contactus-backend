/**
 * A class for user messages.
 */

import { CUError } from './CUError.js';
import { PhoneNumber } from './PhoneNumber.js';
import validator from 'validator';
import config from '../config.json' with { type: 'json' };

enum PreferredMethod {
    Email,
    Phone
}

type MessageData = {
    name             : string;
    email            : string;
    phoneNumber?     : PhoneNumber;
    message          : string;
    preferredMethod  : PreferredMethod;
};

class Message {

    public readonly name            : string;
    public readonly email           : string;
    public readonly phoneNumber?    : PhoneNumber;
    public readonly message         : string;
    public readonly timestamp       : Date;
    public readonly preferredMethod : PreferredMethod;

    public constructor(data: MessageData) {

        if ( typeof data !== 'object' || data === null) {
            throw new CUError(
                {code: '9', message: 'message_generic_error'}
            );
        }

        // Name
        if ( typeof data.name !== 'string' ) {
            throw new CUError(
                {code: '10', message: 'message_invalid_name'}
            );
        } else {
            data.name = data.name.trim();
        }

        if ( data.name.length === 0 || data.name.length > config.name.lengthMax ) {
            throw new CUError(
                {code: '10', message: 'message_invalid_name'}
            );
        }

        // Email
        if ( typeof data.email !== 'string' ||
            data.email.length < config.email.lengthMin ||
            data.email.length > config.email.lengthMax ||
            !validator.isEmail(data.email, {
                allow_utf8_local_part: false
            })
        ) {
            throw new CUError(
                {code: '11', message: 'message_invalid_email'}
            );
        } else {
            data.email = data.email.toLowerCase();
        }
        
        // Phone Number
        if ( data.phoneNumber !== undefined ) {
            if ( !(data.phoneNumber instanceof PhoneNumber) ) {
                throw new CUError(
                    {code: '12', message: 'message_invalid_phone_number'}
                );
            }
        }

        // Message
        if ( typeof data.message !== 'string' ) {
            throw new CUError(
                {code: '13', message: 'message_invalid_message'}
            );
        } else {
            data.message = data.message.trim();
        }

        if ( data.message.length === 0 || data.message.length > config.message.lengthMax ) {
            throw new CUError(
                {code: '13', message: 'message_invalid_message'}
            );
        }

        // Preferred Method
        if ( typeof data.preferredMethod !== 'number' ||
             !Object.values(PreferredMethod).includes(data.preferredMethod) ) {
            throw new CUError(
                {code: '14', message: 'message_invalid_preferred_method'}
            );
        }

        if ( data.preferredMethod === PreferredMethod.Phone && data.phoneNumber === undefined ) {
            throw new CUError(
                {code: '14', message: 'message_invalid_preferred_method'}
            );
        }

        this.name            = data.name;
        this.email           = data.email;
        this.phoneNumber     = data.phoneNumber;
        this.message         = data.message;
        this.preferredMethod = data.preferredMethod;
        this.timestamp       = new Date();

    }
}

export { Message, PreferredMethod as MessagePreferredMethod };
export type { MessageData };
