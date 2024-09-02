import express from "express";
import connectToMongoDB from "./config/db.js";
import { fMsg } from "./utils/libby.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

import testRoute from "./routes/test.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

app.use(express.json());
app.use(cookieParser());

app.use("/test", testRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use("*", (req, res, next) => {
  fMsg(res, "Invalid Route", null, 404);
});

app.use((err, req, res, next) => {
  fMsg(res, err.message, null, err.status || 500);
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
