import type { Envs } from "./env";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Envs {}
  }
}

declare module "next-auth" {
  interface Session {
    accessToken: any;
  }
}
