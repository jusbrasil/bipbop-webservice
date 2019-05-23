import Exception from './exception';

export default class ExceptionBlockedByConfig extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionBlockedByConfig.prototype);
  }
}