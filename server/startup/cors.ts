import cors from "cors";
import { Express } from "express";

export function initCORS(app: Express) {
  app.use(
    cors({
      origin: `http://${process.env.HOST}`,
      methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
      optionsSuccessStatus: 204,
      credentials: true
    })
  );
}
