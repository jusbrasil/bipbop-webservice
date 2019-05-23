import Exception from './exception';

export default class ExceptionOutdated extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionOutdated.prototype);
  }
}