import express from "express";
import connectToMongoDB from "./config/db.js";
import { fMsg } from "./utils/libby.js";

const app = express();
const PORT = process.env.PORT || 3000;

import testRoute from "./routes/test.route.js";

app.use("/test", testRoute);

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
