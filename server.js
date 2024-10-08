import express from "express";
import connectToMongoDB from "./config/db.js";
import { fMsg } from "./utils/libby.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

import testRoute from "./routes/test.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import inviteCodeRoute from "./routes/inviteCode.route.js";
import taskRoute from "./routes/task.route.js";


// Remove or comment out the existing CORS configuration
// app.use(cors({
//   origin:"https://tharhtet236401.github.io",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));

// If you still want to use CORS for other origins, you can set it up like this:
app.use(cors({
  origin: true, // This allows the server to accept requests from the same origin
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

// Update this line to serve splash.html as the default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'splash.html'));
});

app.use("/test", testRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/inviteCode", inviteCodeRoute);
app.use("/api/tasks", taskRoute);

app.use("*", (req, res, next) => {
  next(new Error("Invalid Route"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  err.status = err.status || 505;
  res.status(err.status).json({ con: false, "msg": err.message });
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
