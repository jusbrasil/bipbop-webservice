import ErrorCodes from './error-codes';

export default class BIPBOPException extends Error {

    public push: boolean | undefined;
    public code: ErrorCodes | undefined;

    constructor(msg: string | undefined) {
        super(msg);
        Object.setPrototypeOf(this, BIPBOPException.prototype);
    }

    static factory(message?: string | undefined, code: ErrorCodes = ErrorCodes.E_UNKNOWN, push: boolean = false) : BIPBOPException {
        const exception = new this(message);
        exception.code = code;
        exception.push = push;
        return exception;
    }
}
