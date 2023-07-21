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
const factRoutes = require("./routes/factRouter");
const courseRoutes = require("./routes/courseRouter");
const testimonialRoutes = require("./routes/testimonialRouter");
const vacancyRoutes = require("./routes/vacancyRouter");
const blogRoutes = require("./routes/blogRouter");
const notificationRoutes = require("./routes/notificationRouter");
const sessionRoutes = require("./routes/sessionRouter");
const galleryRoutes = require("./routes/galleryRouter");
const emailRoutes = require("./routes/emailRouter");
const teamRoutes = require("./routes/teamRouter");
const enquiryRoutes = require("./routes/enquiryRouter");
const requestRoutes = require("./routes/requestRouter");
const studentRoutes = require("./routes/studentRouter");
const teacherRoutes = require("./routes/teacherRouter");
const trainerRoutes = require("./routes/trainerRouter");

app.use(fileUpload());

app.use("/api/users", userRoutes);
app.use("/api/facts", factRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/vacancy", vacancyRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/sendEmail", emailRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/trainer", trainerRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is runninng in port ${port}`);
});
