import Exception from './exception';

export default class ExceptionQueryLimit extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionQueryLimit.prototype);
  }
}