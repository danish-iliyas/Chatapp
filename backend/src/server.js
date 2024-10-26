import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import chatRoutes  from "./routes/chatRoutes.js";
import cookieParser from "cookie-parser";
import {dbConnection} from "./db/dbConnection.js";

import {app , server} from "./Socket/Socket.js";

dotenv.config();

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;
console.log(port)

app.get("/", (req, res) => {
  // console.log("testing server");
  //  res.json.send("hello");
  res.status(200).json({ message: "hello" })
})
app.use("/api/v1", userRoute);
app.use("/api/v1/chats", chatRoutes);

dbConnection().then(() => {
  server.listen(port, () => {
    console.log(`server is running on port ${port}`);
  })
}).catch((error) => {
  console.log(error);
})
