/**
 *  Exception
 * @public
 */
export default class Exception {
  err?: Error;
  error?: Error;
  errorCode: number;
  message: string;

  constructor(errorCode: number, message: string, err?: Error) {
    this.errorCode = errorCode;
    this.message = message;
    if (err) {
      this.err = err;
    }
  }
}
