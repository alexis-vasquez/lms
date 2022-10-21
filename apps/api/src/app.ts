import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./router";

export const app = express();

app.use(cors());
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);
