import Exception from './exception';

export default class ExceptionMissingArgument extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionMissingArgument.prototype);
  }
}