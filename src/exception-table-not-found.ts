import Exception from './exception';

export default class ExceptionTableNotFound extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionTableNotFound.prototype);
  }
}