import { createMiddleware } from "@promster/express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import chalk from "chalk";
import express, {
  Application,
  Handler,
  Request,
  Response,
  Router,
} from "express";
import { ENVConfig } from "../config/env";
import expressConfig from "../config/expressConfig";
import i18nextConfig from "../config/i18nextConfig";
import logger from "../config/logger/Logger";

// Dao
import { IRouter } from "../helpers/decorators/handlers.decorator";
import { MetadataKeys } from "../helpers/decorators/metadata.keys";
// Helper
import JwtHandler from "../helpers/jwtHandler";
import * as resHndlr from "../helpers/resHandler";
import PromClient from "../lib/prometheus";
import JwtAuthenticator from "../middlewares/authentication";
import { LSRedisClient } from "../redis/redis";
// import MailService from "../services/mail.service";
// Route

export default async function createExpressApp(
  envConfig: ENVConfig
): Promise<Application> {
  const redisClient = new LSRedisClient(envConfig.redisDb);
  await redisClient.connectRedis();

  logger.info("Redis db connection established!");

  const expressApp = express();
  expressApp.use(createMiddleware({ app: expressApp }));

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
  expressApp.use(
    Sentry.Handlers.requestHandler({
      ip: true,
      serverName: false,
      user: ["email"],
    })
  );
  // TracingHandler creates a trace for every incoming request
  expressApp.use(Sentry.Handlers.tracingHandler());

  await expressConfig(expressApp, envConfig);

  const apiRouter = Router();

  expressApp.listen(expressApp.get("port"), () => {
    logger.info(
      "%s App is running at http://localhost:%d in %s mode",
      chalk.green("✓"),
      expressApp.get("port"),
      expressApp.get("env")
    );
    logger.info("Press CTRL-C to stop\n");
  });
  // init Prom Client
  const promClient = new PromClient(expressApp, envConfig.prometheusAppName);
  await promClient.init();

  // helpers Service
  // const mailService = new MailService();
  const jwtHandler = new JwtHandler(
    redisClient,
    envConfig.jwtKey,
    i18nextConfig
  );

  const authenticator = new JwtAuthenticator(jwtHandler);
  // init Services

  // init Route

  // REMINDER: Make sure to add all service files into this services array.
  function registerRouters() {
    // const services = [{ instance: userService, className: UserService }];
    const services = [];
    const info: Array<{ api: string; handler: string }> = [];

    services.forEach((service) => {
      const serviceInstance: { [handleName: string]: Handler } =
        service.instance as any;

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        service.className
      );
      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        service.className
      );

      const exRouter = express.Router();

      routers.forEach(({ method, path, handlerName }) => {
        exRouter[method](
          path,
          serviceInstance[String(handlerName)].bind(serviceInstance)
        );

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

  expressApp.use(
    "/api",
    (req, res, next) => {
      req.headers.app_language = req.language || "en";
      i18nextConfig.changeLanguage(req.language);
      next();
    },
    apiRouter
  );

  expressApp.get("/status", (req: Request, res: Response) => {
    res.send("Success");
  });

  expressApp.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        // Capture all 404 and 500 errors
        if ([400, 401, 422, 500, 404].includes(Number(error.status))) {
          return true;
        }
        return false;
      },
    })
  );

  expressApp.use(resHndlr.handleError);

  return expressApp;
}
