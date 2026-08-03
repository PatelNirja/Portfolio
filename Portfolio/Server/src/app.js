const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req,res) => {
    res.json({
        success: true,
        message: "Welcome to the Portfolio API"
    });
});

const projectRoutes = require("./routes/project.routes");

app.use("/api/projects", projectRoutes);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
module.exports = app;