import Exception from './exception';

export default class ExceptionWithoutProceedings extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionWithoutProceedings.prototype);
  }
}