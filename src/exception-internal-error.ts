import Exception from './exception';

export default class ExceptionInternalError extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionInternalError.prototype);
  }
}