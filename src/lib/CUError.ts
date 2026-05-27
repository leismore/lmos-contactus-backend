/**
 * The Error class for this project.
 * 
 * Code    Message
 * 1       unknown
 * 2       phone_number_invalid
 * 3       phone_number_invalid_country_code
 * 9       message_generic_error
 * 10      message_invalid_name
 * 11      message_invalid_email
 * 12      message_invalid_phone_number
 * 13      message_invalid_message
 * 14      message_invalid_preferred_method
 */

import { LMError } from '@leismore/lmos-nodejs-lmerror';
import type { LMErrorErr, LMErrorRes, LMErrorResHeader } from '@leismore/lmos-nodejs-lmerror';

class CUError extends LMError {

    /**
     * @throws {Error}
     *   invalid_error
     *   invalid_error_message
     *   invalid_error_code
     *   invalid_http_response
     *   invalid_http_statusCode
     *   invalid_http_header
     *   invalid_http_body
     *   invalid_previous
     */
    public constructor(error: LMErrorErr, response?: LMErrorRes, previous?: Error) {

        try {
            super(error, response, previous);
        } catch (err) {
            throw err;
        }
        

        this.name = 'CUError';

    }

}

export { CUError };

export type {
    LMErrorErr       as CUErrorErr,
    LMErrorRes       as CUErrorRes,
    LMErrorResHeader as CUErrorResHeader
};
