import Exception from './exception';

export default class ExceptionResourceUnavailable extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionResourceUnavailable.prototype);
  }
}