const express = require("express");
const connectDb = require("./config/mongoDb");
const userRoute = require("./routes/userRoutes");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
connectDb();
const app = express();
app.use(express.json());
app.use('/', userRoute);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});