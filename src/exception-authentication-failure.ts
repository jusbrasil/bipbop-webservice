import Exception from './exception';

export default class ExceptionAuthenticationFailure extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionAuthenticationFailure.prototype);
  }
}