export default class LoggerStreamAdapter {
  static toStream(logger: { info: (arg0: any) => void }): any {
    return {
      write(message: string | any[]) {
        if (!/\/metrics/.test(String(message))) {
          logger.info(message.slice(0, -1));
        }
      },
    };
  }
}
