import { z } from "zod";

console.write("\x1Bc");

const configSchema = z.object({
  API_PORT: z.string().nonempty().transform(Number),
  DB_FILE_NAME: z.string().nonempty(),
});

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
  console.error(
    "[@brief/api] Invalid environment variables :\n",
    z.prettifyError(parsedConfig.error),
  );
  process.exit(1);
}

export const config = parsedConfig.data;
