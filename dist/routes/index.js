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
const express_1 = require("@promster/express");
const Sentry = __importStar(require("@sentry/node"));
const Tracing = __importStar(require("@sentry/tracing"));
const chalk_1 = __importDefault(require("chalk"));
const express_2 = __importStar(require("express"));
const expressConfig_1 = __importDefault(require("../config/expressConfig"));
const i18nextConfig_1 = __importDefault(require("../config/i18nextConfig"));
const Logger_1 = __importDefault(require("../config/logger/Logger"));
const metadata_keys_1 = require("../helpers/decorators/metadata.keys");
// Helper
const jwtHandler_1 = __importDefault(require("../helpers/jwtHandler"));
const resHndlr = __importStar(require("../helpers/resHandler"));
const prometheus_1 = __importDefault(require("../lib/prometheus"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const redis_1 = require("../redis/redis");
// import MailService from "../services/mail.service";
// Route
async function createExpressApp(envConfig) {
    const redisClient = new redis_1.LSRedisClient(envConfig.redisDb);
    await redisClient.connectRedis();
    Logger_1.default.info("Redis db connection established!");
    const expressApp = (0, express_2.default)();
    expressApp.use((0, express_1.createMiddleware)({ app: expressApp }));
    expressApp.set("trust proxy", true);
    Sentry.init({
        environment: envConfig.env,
        dsn: envConfig.sentry.dsn,
        integrations: [
            // enable HTTP calls tracing
            new Sentry.Integrations.Http({ tracing: true }),
            // enable Express.js middleware tracing
            new Tracing.Integrations.Express({ app: expressApp }),
        ],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 0.2,
    });
    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    expressApp.use(Sentry.Handlers.requestHandler({
        ip: true,
        serverName: false,
        user: ["email"],
    }));
    // TracingHandler creates a trace for every incoming request
    expressApp.use(Sentry.Handlers.tracingHandler());
    await (0, expressConfig_1.default)(expressApp, envConfig);
    const apiRouter = (0, express_2.Router)();
    expressApp.listen(expressApp.get("port"), () => {
        Logger_1.default.info("%s App is running at http://localhost:%d in %s mode", chalk_1.default.green("✓"), expressApp.get("port"), expressApp.get("env"));
        Logger_1.default.info("Press CTRL-C to stop\n");
    });
    // init Prom Client
    const promClient = new prometheus_1.default(expressApp, envConfig.prometheusAppName);
    await promClient.init();
    // helpers Service
    // const mailService = new MailService();
    const jwtHandler = new jwtHandler_1.default(redisClient, envConfig.jwtKey, i18nextConfig_1.default);
    const authenticator = new authentication_1.default(jwtHandler);
    // init Services
    // init Route
    // REMINDER: Make sure to add all service files into this services array.
    function registerRouters() {
        // const services = [{ instance: userService, className: UserService }];
        const services = [];
        const info = [];
        services.forEach((service) => {
            const serviceInstance = service.instance;
            const basePath = Reflect.getMetadata(metadata_keys_1.MetadataKeys.BASE_PATH, service.className);
            const routers = Reflect.getMetadata(metadata_keys_1.MetadataKeys.ROUTERS, service.className);
            const exRouter = express_2.default.Router();
            routers.forEach(({ method, path, handlerName }) => {
                exRouter[method](path, serviceInstance[String(handlerName)].bind(serviceInstance));
                info.push({
                    api: `${method.toLocaleUpperCase()} ${basePath + path}`,
                    handler: `${service.className.name}.${String(handlerName)}`,
                });
            });
            expressApp.use(basePath, exRouter);
        });
        // console.table(info);
    }
    registerRouters();
    // router definition
    // apiRouter.use("/providers", createProviderRoute);
    // apiRouter.use("/users", createUserRoute);
    expressApp.use("/api", (req, res, next) => {
        req.headers.app_language = req.language || "en";
        i18nextConfig_1.default.changeLanguage(req.language);
        next();
    }, apiRouter);
    expressApp.get("/status", (req, res) => {
        res.send("Success");
    });
    expressApp.use(Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
            // Capture all 404 and 500 errors
            if ([400, 401, 422, 500, 404].includes(Number(error.status))) {
                return true;
            }
            return false;
        },
    }));
    expressApp.use(resHndlr.handleError);
    return expressApp;
}
exports.default = createExpressApp;
//# sourceMappingURL=index.js.map