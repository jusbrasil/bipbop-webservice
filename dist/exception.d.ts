import Exception from 'es6-error';
import ErrorCodes from './error-codes';
export default class BIPBOPException extends Exception {
    push: boolean | undefined;
    code: ErrorCodes | undefined;
    static factory(message?: string | undefined, code?: ErrorCodes, push?: boolean): typeof BIPBOPException;
}
