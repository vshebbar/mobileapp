const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { pool } = require("./database"); // Database Connection
const gptPromptsRouter = require("./controllers/GptPromptsController"); // GPT API
const userRouter = require("./controllers/UserController"); // User Management API

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Attach Controllers
app.use("/api/Gpt", gptPromptsRouter);
app.use("/api/Users", userRouter);

// Health Check Endpoint
app.get("/", (req, res) => res.send("🚀 Server is running!"));

// ✅ Local Development Mode
if (process.env.LOCAL_SERVER) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Local server running on http://localhost:${PORT}`);
  });
}

// Export Express App
module.exports = app;
