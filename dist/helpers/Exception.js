"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  Exception
 * @public
 */
class Exception {
    err;
    error;
    errorCode;
    message;
    constructor(errorCode, message, err) {
        this.errorCode = errorCode;
        this.message = message;
        if (err) {
            this.err = err;
        }
    }
}
exports.default = Exception;
//# sourceMappingURL=Exception.js.map