"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  API response
 * @public
 */
class APIResponse {
    error;
    result;
    sc;
    time;
    constructor(sc, result) {
        this.sc = sc;
        if (sc) {
            this.result = result || {};
        }
        else {
            this.error = result || {};
        }
        this.time = new Date().getTime();
    }
}
exports.default = APIResponse;
//# sourceMappingURL=APIResponse.js.map