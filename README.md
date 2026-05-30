# lmos-contactus-backend

A set of RESTFul APIs to forward client messages to an email address.

## Donation

Become a sponsor to [Leismore](https://github.com/sponsors/leismore)

## Motivation

I was developing a Coming-Soon website for [My Clever Stamps](https://www.mycleverstamps.com). It needs a Contact Us Form to allow visitors to send messages to us. Because this is actually required everywhere, I decided to build a solid solution.

## Installation & Deployment

1. `git clone https://github.com/leismore/lmos-contactus-backend.git`
2. Change the file name from `src/config_sample.json`     to `config.json`
3. Change the file name from `src/credential_sample.json` to `credential.json`
4. Adjust the `config.json` and `credential.json` files according to your environment
5. `npm run build`

The production code is in the `dist` directory.

## Test

`npm test`

## Build

`npm run build`

## APIs

### Message Send

A RESTFul API for emailing messages to the administrator.

* Endpoint   : `/api/message-send`
* Method     : `POST`
* Media Type : `application/json`

**Request**

```
{
    name            : string
    email           : string

    phone           : {
      country       : string
      number        : string
    } | null

    message         : string
    preferredMethod : "email" | "phone"
}
```

*When `config.phone.required` = true, the Phone field can NOT be null.*

**Responses**

204 No Content - Message sent successfully.

415 Unsupported Media Type

```
{
    error: generic_error   |
           invalid_json    |
           invalid_name    |
           invalid_email   |
           invalid_phone   |
           invalid_message |
           invalid_preferred_method
}
```

500 Internal Server Error

```
{
    error: generic_error |
           email_server_error
}
```

*When `config.app.debug` = false, no body will be sent with 500 response.*

## Known Issues

* Fake test script always returns success
* User name and message text only allows limited characters for security reasons
* Express.js default error handler is used

## License

© [Leismore](https://www.leismore.co) 2026

[MIT License](https://choosealicense.com/licenses/mit)

## Authors

* [Kyle Chine / Kai Qin / 秦凯](https://kyle.chine.leismore.org) since 30 May 2026




------------------------------------------------------------------------------

Product of [Leismore OpenSource](https://lmos.leismore.org) Project

Supported by [Leismore](https://www.leismore.co) (Australian Business Number: 25 935 862 619)
