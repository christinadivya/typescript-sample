"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = exports.sendSuccessWithMsg = exports.handleError = exports.sendError = exports.sendResponse = void 0;
const Sentry = __importStar(require("@sentry/node"));
const express_validation_1 = require("express-validation");
const Logger_1 = __importDefault(require("../config/logger/Logger"));
const APIResponse_1 = __importDefault(require("./APIResponse"));
const Exception_1 = __importDefault(require("./Exception"));
// This function is used to send success / error response
/**
 *
 * @param res -express response object
 * @param result- result to send in response
 * @returns - express response
 */
function sendResponse(res, result) {
    try {
        if (result && result.error && result.error.errorCode === 1) {
            return res.status(500).send(result);
        }
        // Internal server error
        if (result && result.error && result.error.errorCode === 2) {
            return res.status(400).send(result);
        }
        // Bad request
        if (result &&
            result.error &&
            (result.error.errorCode === 5 || result.error.errorCode === 6)) {
            return res.status(401).send(result);
        }
        // Un-authorized
        if (result && result.error && result.error.errorCode === 4) {
            return res.status(409).send(result);
        } // Conflict and in duplicate data
        if (result && result.error && result.error.errorCode === 7) {
            return res.status(429).send(result);
        }
        // send status code 200
        return res.status(200).send(result);
    }
    catch (error) {
        Logger_1.default.error(error);
        throw error;
    }
}
exports.sendResponse = sendResponse;
/**
 *This function is used to send error to end users
 * @param res -express response object
 * @param err -error to send
 */
function sendError(res, err) {
    try {
        Sentry.captureMessage(JSON.stringify(err));
        Logger_1.default.error(err);
        let error = err?.err;
        if (err?.error) {
            error = err.error;
        }
        let errorCode = err?.errorCode || 1;
        let message;
        if (err instanceof express_validation_1.ValidationError) {
            message = err.details;
            errorCode = 2;
        }
        else if (!err?.message) {
            message = "Internal Server Error";
        }
        else if (typeof err?.message === "string") {
            message = err?.message;
        }
        else {
            message = err.message;
        }
        let responseError;
        if (err instanceof express_validation_1.ValidationError) {
            responseError = new Exception_1.default(errorCode, message[0], error);
            // responseError.message = ;
        }
        else {
            responseError = new Exception_1.default(errorCode, message, error);
            responseError.message = message;
        }
        const result = new APIResponse_1.default(false, responseError);
        sendResponse(res, result);
    }
    catch (error) {
        // Hopefully never happens...
        Logger_1.default.error(error);
    }
}
exports.sendError = sendError;
// N.B. All 4 variables are required for express to call the handler
/**
 *This function is used to handle uncaught exception
 * @param err -exception
 * @param req -express request object
 * @param res -express response object
 * @param next -express next function
 */
function handleError(err, req, res, next) {
    sendError(res, err);
}
exports.handleError = handleError;
/**
 *This function is used to send success message response
 * @param res -express response object
 * @param message -success message
 */
function sendSuccessWithMsg(res, message) {
    try {
        const rslt = { message };
        const result = new APIResponse_1.default(true, rslt);
        sendResponse(res, result);
    }
    catch (error) {
        Logger_1.default.error(error);
        throw error;
    }
}
exports.sendSuccessWithMsg = sendSuccessWithMsg;
/**
 *This function is used to send success response to end-user
 * @param res -express response object
 * @param rslt - message to send end user object or string by default it is set to empty object
 */
function sendSuccess(res, rslt = {}) {
    try {
        const result = new APIResponse_1.default(true, rslt);
        sendResponse(res, result);
    }
    catch (error) {
        Logger_1.default.error(error);
        throw error;
    }
}
exports.sendSuccess = sendSuccess;
//# sourceMappingURL=resHandler.js.map