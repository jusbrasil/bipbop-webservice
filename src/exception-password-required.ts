import Exception from './exception';

export default class ExceptionPasswordRequired extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionPasswordRequired.prototype);
  }
}