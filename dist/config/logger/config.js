"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ENV = process.env.NODE_ENV || "dev";
exports.default = {
    appenders: {
        app: {
            type: "dateFile",
            filename: `logs/${ENV}`,
            pattern: ".yyyy-MM-dd.log",
            compress: true,
            alwaysIncludePattern: true,
        },
        consoleAppender: { type: "console" },
    },
    categories: {
        default: { appenders: ["app", "consoleAppender"], level: "debug" },
    },
};
//# sourceMappingURL=config.js.map