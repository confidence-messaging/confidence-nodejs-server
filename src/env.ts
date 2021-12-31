import { cleanEnv, str, num, url } from "envalid";

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  HOMEPAGE: url(),
  PORT: num(),
  NAME: str(),
});

export default env;
