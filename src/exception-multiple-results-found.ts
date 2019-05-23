import Exception from './exception';

export default class ExceptionMultipleResultsFound extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionMultipleResultsFound.prototype);
  }
}