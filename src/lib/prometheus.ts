import { getContentType, getSummary } from "@promster/express";
import { Application } from "express";
import client, { Registry } from "prom-client";

export default class PromClient {
  public expressApp: Application;
  public register: Registry;
  public appName: string;
  constructor(expressApp: Application, appName: string) {
    this.expressApp = expressApp;
    this.appName = appName;
    this.register = new client.Registry();
  }

  private async configMetricsAPI(): Promise<void> {
    this.expressApp.use("/metrics", async (req, res) => {
      res.setHeader("Content-Type", getContentType());
      res.end(await getSummary());
    });
  }

  private async defaultMetrics(): Promise<void> {
    const { collectDefaultMetrics } = client;
    collectDefaultMetrics({ register: this.register });
  }

  public async init(): Promise<void> {
    this.register.setDefaultLabels({
      app: this.appName,
    });

    await this.defaultMetrics();
    await this.configMetricsAPI();
  }
}
