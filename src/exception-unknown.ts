import Exception from './exception';

export default class ExceptionUnknown extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionUnknown.prototype);
  }
}