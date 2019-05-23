import Exception from './exception';

export default class ExceptionDatabaseNotFound extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionDatabaseNotFound.prototype);
  }
}