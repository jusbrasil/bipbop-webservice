import Exception from './exception';

export default class ExceptionInternalPushLabel extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionInternalPushLabel.prototype);
  }
}