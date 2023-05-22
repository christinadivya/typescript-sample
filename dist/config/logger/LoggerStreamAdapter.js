"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoggerStreamAdapter {
    static toStream(logger) {
        return {
            write(message) {
                if (!/\/metrics/.test(String(message))) {
                    logger.info(message.slice(0, -1));
                }
            },
        };
    }
}
exports.default = LoggerStreamAdapter;
//# sourceMappingURL=LoggerStreamAdapter.js.map