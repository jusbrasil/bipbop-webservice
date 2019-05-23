import Exception from './exception';

export default class ExceptionInternalNotReady extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionInternalNotReady.prototype);
  }
}