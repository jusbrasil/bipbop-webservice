import Exception from './exception';

export default class ExceptionEmailUnchecked extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionEmailUnchecked.prototype);
  }
}