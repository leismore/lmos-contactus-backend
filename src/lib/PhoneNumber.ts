/**
 * A class for international phone numbers.
 */

import { CUError } from './CUError.js';

const REGEX_COUNTRY_CODE = /^\d{1,6}$/;
const REGEX_PHONE_NUMBER = /^\d{1,14}$/;

class PhoneNumber {

    public readonly countryCode: string;
    public readonly phoneNumber: string;

    public constructor(countryCode: string, phoneNumber: string) {

        if ( typeof countryCode !== 'string' || !REGEX_COUNTRY_CODE.test(countryCode)) {
            throw new CUError(
                {code: '3', message: 'phone_number_invalid_country_code'}
            );
        }

        if ( typeof phoneNumber !== 'string' || !REGEX_PHONE_NUMBER.test(phoneNumber)) {
            throw new CUError(
                {code: '2', message: 'phone_number_invalid'}
            );
        }

        this.countryCode = countryCode;
        this.phoneNumber = phoneNumber;
    }

    public toString(): string {
        return `+${this.countryCode} ${this.phoneNumber}`;
    }
}

export { PhoneNumber };
