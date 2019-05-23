import Exception from './exception';

export default class ExceptionExpectedDataNotFound extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionExpectedDataNotFound.prototype);
  }
}