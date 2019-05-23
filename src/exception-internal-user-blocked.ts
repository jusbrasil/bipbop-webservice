import Exception from './exception';

export default class ExceptionInternalUserBlocked extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionInternalUserBlocked.prototype);
  }
}