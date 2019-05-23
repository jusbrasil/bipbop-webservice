import Exception from './exception';

export default class ExceptionTimeout extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionTimeout.prototype);
  }
}