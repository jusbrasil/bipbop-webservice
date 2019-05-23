import Exception from './exception';

export default class ExceptionArchivedProcess extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionArchivedProcess.prototype);
  }
}