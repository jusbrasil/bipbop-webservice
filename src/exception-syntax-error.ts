import Exception from './exception';

export default class ExceptionSyntaxError extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionSyntaxError.prototype);
  }
}