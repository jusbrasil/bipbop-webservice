import Exception from './exception';

export default class ExceptionBlockedIp extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionBlockedIp.prototype);
  }
}