"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = __importDefault(require("./Exception"));
exports.default = {
    /**
     *This function is to handle internal server error
     * @param errMsg - error message
     * @param err - error
     * @returns - exception
     */
    intrnlSrvrErr(errMsg, err) {
        return new Exception_1.default(1, errMsg, err);
    },
    /**
     *This function is to handel validation error
     * @param errMsg -error message
     * @returns exception
     */
    validationError(errMsg) {
        return new Exception_1.default(2, errMsg);
    },
    /**
     *This function is to handel unauthenticated access error
     * @param errMsg -error message
     * @param errorCode -error code
     * @returns exception
     */
    unAuthenticatedAccess(errMsg, errorCode) {
        return new Exception_1.default(errorCode, errMsg);
    },
    /**
     *This function is to handle conflict error
     * @param errMsg -error message
     * @returns - exception
     */
    conflictError(errMsg) {
        return new Exception_1.default(4, errMsg);
    },
};
//# sourceMappingURL=customExceptions.js.map