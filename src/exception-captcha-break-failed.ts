import Exception from './exception';

export default class ExceptionCaptchaBreakFailed extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionCaptchaBreakFailed.prototype);
  }
}