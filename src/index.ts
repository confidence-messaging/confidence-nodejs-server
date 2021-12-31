import { routes } from "./routes";
import express from "express";
import { Database } from "./services/Database";

const PORT = 3001;

async function main() {
  console.log("🔒 Confidence server is starting...");

  const app = express();

  const db = new Database();

  await db.start();

  app.use(routes);

  app.listen(PORT, () =>
    console.log(`✨ Confidence is running in port ${PORT}`)
  );
}

main();
