import "dotenv/config";
import express from "express";
import cors from "cors";
import usersRoute from "./routes/users";
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);

app.listen(PORT, () => console.log("Server running on port " + PORT));
