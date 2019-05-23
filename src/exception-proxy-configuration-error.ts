import Exception from './exception';

export default class ExceptionProxyConfigurationError extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionProxyConfigurationError.prototype);
  }
}