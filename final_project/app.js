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

// מאפשר CORS דינמי לפי ה-origin
app.use(
  cors({
    origin: (origin, callback) => {
      // הדפסה לוג לצורך בדיקה
      console.log("CORS origin:", origin);

      // מאפשר localhost וגם האתר ב-Vercel
      if (
        !origin ||
        origin.includes("localhost") ||
        origin.includes("vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// חובה לתמוך ב-OPTIONS preflight
app.options("*", cors());

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
