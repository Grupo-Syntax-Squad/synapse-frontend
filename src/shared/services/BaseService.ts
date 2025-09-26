import type { RawAxiosRequestHeaders } from "axios";

export abstract class BaseService {
  protected static prefix: string = "";

  protected static setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  protected static endpoint(path: string): string {
    return this.prefix + path;
  }

  protected static async getHeaders(): Promise<RawAxiosRequestHeaders> {
    return {
      "Content-Type": "application/json",
    };
  }
}
