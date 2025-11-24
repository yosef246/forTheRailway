import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import newUserRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import tagRouter from "./routes/tag.js";
import paymentRouter from "./routes/payment.js";

import connectToMongoDB from "../utils/conectDB.js";

const app = express();
// const port = 3003;
const port = process.env.PORT || 3000;
// CORS middleware
const allowedOrigins = [
  "http://localhost:3000",
  "https://party-cards-with-react-node-js.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

//env מאפשר לי להשתמש בערכים שנמצאים בקובץ
dotenv.config();

//middleware - לייבוא המידע שנכנס
app.use(express.json());

//מפרש את הקוקיז שמגיע מהלקוח
app.use(cookieParser());

//מתחבר למונגו שלי
connectToMongoDB();

app.use("/api/auth", newUserRouter);
app.use("/api/post", postRouter);
app.use("/api/tag", tagRouter);
app.use("/api/payment", paymentRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example run on port ${port}!`);
});

export default app;
