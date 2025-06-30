import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import instructorRoute from "./routes/instructor.route.js";
import { initializeFirebase } from "./config/firebase.js";

dotenv.config({});

// Initialize Firebase
initializeFirebase();

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 8080;

// default middleware
app.use(express.json());

app.use(cors({
    origin:"https://skillhive-milan.vercel.app",
    credentials:true
}));
 
// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/instructor", instructorRoute);
 app.get("/", (req, res) => {
    res.send("Welcome to SkillHive API");
    });
 
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})


