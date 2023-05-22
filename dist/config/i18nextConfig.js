"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(require("i18next"));
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const path_1 = require("path");
i18next_1.default
    .use(i18next_http_middleware_1.default.LanguageDetector)
    .use(i18next_fs_backend_1.default)
    .init({
    detection: { lookupHeader: "app-language" },
    debug: false,
    backend: {
        addPath: (0, path_1.join)(__dirname, "./locales/{{lng}}/{{ns}}.missing.json"),
        loadPath: (0, path_1.join)(__dirname, "./locales/{{lng}}/{{ns}}.json"),
    },
    ns: ["translation"],
    fallbackLng: ["en"],
    preload: ["en"],
});
exports.default = i18next_1.default;
//# sourceMappingURL=i18nextConfig.js.map