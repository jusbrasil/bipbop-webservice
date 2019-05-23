import Exception from './exception';

export default class ExceptionLegalReview extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionLegalReview.prototype);
  }
}