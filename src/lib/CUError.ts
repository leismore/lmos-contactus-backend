/**
 * The Error class for this project.
 * 
 * Code    Message
 * 1       Unknown
 */

import { LMError } from '@leismore/lmos-nodejs-lmerror';
import type { LMErrorErr, LMErrorRes, LMErrorResHeader } from '@leismore/lmos-nodejs-lmerror';

class CUError extends LMError {

    public constructor(error: LMErrorErr, response?: LMErrorRes, previous?: Error) {
        super(error, response, previous);
        this.name = 'CUError';
    }

}

export { CUError };

export type {
    LMErrorErr       as CUErrorErr,
    LMErrorRes       as CUErrorRes,
    LMErrorResHeader as CUErrorResHeader
};
