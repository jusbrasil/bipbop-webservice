import Exception from './exception';

export default class ExceptionJusticeSecret extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionJusticeSecret.prototype);
  }
}