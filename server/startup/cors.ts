import cors from "cors";
import { Express } from "express";

export function initCORS(app: Express) {
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
      optionsSuccessStatus: 204
    })
  );
}
