/**
 * The Error class for this project.
 * 
 * Code    Message
 * 1       Unknown
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
