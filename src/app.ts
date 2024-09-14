import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/route";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

export default app;
