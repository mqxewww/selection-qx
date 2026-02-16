declare module "bun" {
  interface Env {
    API_PORT: number;
    DB_FILE_NAME: string;
  }
}
