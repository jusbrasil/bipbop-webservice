import ErrorCodes from './error-codes';

export default class BIPBOPException extends Error {

    public push: boolean | undefined;
    public code: ErrorCodes | undefined;

    static factory(message?: string | undefined, code: ErrorCodes = ErrorCodes.E_UNKNOWN, push: boolean = false) {
        const exception = new BIPBOPException(message);
        exception.code = code;
        exception.push = push;
        return this;
    }
}
