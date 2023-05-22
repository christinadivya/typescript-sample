"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@promster/express");
const prom_client_1 = __importDefault(require("prom-client"));
class PromClient {
    expressApp;
    register;
    appName;
    constructor(expressApp, appName) {
        this.expressApp = expressApp;
        this.appName = appName;
        this.register = new prom_client_1.default.Registry();
    }
    async configMetricsAPI() {
        this.expressApp.use("/metrics", async (req, res) => {
            res.setHeader("Content-Type", (0, express_1.getContentType)());
            res.end(await (0, express_1.getSummary)());
        });
    }
    async defaultMetrics() {
        const { collectDefaultMetrics } = prom_client_1.default;
        collectDefaultMetrics({ register: this.register });
    }
    async init() {
        this.register.setDefaultLabels({
            app: this.appName,
        });
        await this.defaultMetrics();
        await this.configMetricsAPI();
    }
}
exports.default = PromClient;
//# sourceMappingURL=prometheus.js.map