import serverless from "serverless-http";
import app from "../final_project/app.js";

export const handler = serverless(app);
