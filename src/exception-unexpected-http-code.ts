import Exception from './exception';

export default class ExceptionUnexpectedHttpCode extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionUnexpectedHttpCode.prototype);
  }
}