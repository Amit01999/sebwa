import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { connectToDatabase } from "./db/connect.js";
import routes from "./routes/index.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { asyncHandler } from "./utils/asyncHandler.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.frontendOrigins,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

// Every request gets a connected (or warm-reused) Mongo connection before
// hitting any route handler.
app.use(
  asyncHandler(async (req, res, next) => {
    await connectToDatabase();
    next();
  }),
);

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
