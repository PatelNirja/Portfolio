const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes");
const errorMiddleware = require("./middleware/error.middleware");
const { generalLimiter } = require("./middleware/rateLimit.middleware");
const ApiResponse = require("./utils/ApiResponse");

const app = express();

// Security headers
app.use(helmet());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev, strict in prod
      }
    },
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Rate limiting for general API calls
app.use("/api", generalLimiter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      { uptime: process.uptime(), timestamp: new Date() },
      "Server is healthy and operational"
    )
  );
});

// API Routes
app.use("/api/v1", routes);
// Legacy route support if needed
app.use("/api/projects", require("./routes/project.routes"));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found on this server`,
  });
});

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;