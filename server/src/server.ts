import express from "express";
import routes from "./routes";
import cors from "cors";
import morgan from "morgan";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(3333, () => {
  console.log("Server running on port 3333");
});
