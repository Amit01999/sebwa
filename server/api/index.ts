import type { IncomingMessage, ServerResponse } from "node:http";
import app from "../src/app.js";

// An Express app is itself a valid (req, res) request handler, so Vercel's
// Node runtime can invoke it directly — no serverless-http adapter needed.
export default function handler(req: IncomingMessage, res: ServerResponse) {
  return app(req, res);
}
