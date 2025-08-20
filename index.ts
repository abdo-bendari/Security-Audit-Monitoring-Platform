import express from "express";
import { Express } from "express";
import { dbConnection } from "./database/dbConnection";
import cors from "cors";
import morgan from "morgan";
import bootstrap from "./src/modules/bootstrap";
const app: Express = express();
dbConnection();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
bootstrap(app);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
