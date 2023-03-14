import type { Envs } from "./env";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Envs {}
  }
}
