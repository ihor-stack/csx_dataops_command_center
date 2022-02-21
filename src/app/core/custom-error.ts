export class CustomError extends Error {
  errorCode: string | number;

  constructor(message: string | string[], code: string | number) {
    // eslint-disable-next-line no-param-reassign
    if (Array.isArray(message)) message = message.join(', ');

    super(message);
    this.name = 'CustomError';

    this.errorCode = (typeof (code) !== 'undefined') ? code : 0;
  }
}
