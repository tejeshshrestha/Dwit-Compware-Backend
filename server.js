const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");

const fileUpload = require("express-fileupload");
const connectDB = require("./config/connectdb");
const app = express();
// config dotenv
dotenv.config();
// config body-parser
app.use(express.json({ limit: "50mb" })); //? allow body parsing
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// config cors
app.use(cors());
//connect to db
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

//routes
const userRoutes = require("./routes/userRoutes");
const factRoutes = require("./routes/factRoutes");
const courseRoutes = require("./routes/courseRouter");
const testimonialRoutes = require("./routes/testimonialRouter");
const vacancyRoutes = require("./routes/vacancyRouter");

app.use(fileUpload());

app.use("/api/users", userRoutes);
app.use("/api/facts", factRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/vacancy", vacancyRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is runninng in port ${port}`);
});
