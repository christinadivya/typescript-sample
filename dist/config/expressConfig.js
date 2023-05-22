"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const helmet_1 = __importDefault(require("helmet"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const i18nextConfig_1 = __importDefault(require("./i18nextConfig"));
const Logger_1 = __importDefault(require("./logger/Logger"));
const LoggerStreamAdapter_1 = __importDefault(require("./logger/LoggerStreamAdapter"));
const apiDocument = yamljs_1.default.load(path_1.default.resolve(__dirname, "../swagger.yml"));
// Start export the app modules
exports.default = async (expressApp, envConfig) => {
    expressApp.use(i18next_http_middleware_1.default.handle(i18nextConfig_1.default));
    const corsOptions = {
        origin: /optisolbusiness\.com|localhost.*$/,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    // This function is used to set headers for cors domain issues
    expressApp.use((0, cors_1.default)(corsOptions));
    expressApp.use((0, morgan_1.default)("dev", { stream: LoggerStreamAdapter_1.default.toStream(Logger_1.default) }));
    expressApp.set("host", envConfig.hostIP || "0.0.0.0");
    expressApp.set("port", envConfig.appPort || 8000);
    expressApp.use(express_1.default.json());
    expressApp.use(express_1.default.urlencoded({ extended: false }));
    expressApp.disable("x-powered-by");
    // eslint-disable-next-line no-unused-vars
    expressApp.use("/swagger.json", (req, res) => {
        res.json(apiDocument);
    });
    const options = {
        customSiteTitle: "API Swagger Document",
        customCss: `
    .swagger-ui .topbar {
      display: none;
    }
    .swagger-ui .models {
      display: none;
    }`,
    };
    expressApp.use("/apiDocs", (0, express_basic_auth_1.default)({
        users: { [envConfig.basicAuth.user]: envConfig.basicAuth.password },
        challenge: true,
    }), swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(apiDocument, options));
    // moved to down because swagger throws an error
    expressApp.use((0, helmet_1.default)());
};
//# sourceMappingURL=expressConfig.js.map