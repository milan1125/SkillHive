import express from "express";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.js";
import { 
  getInstructorAnalytics, 
  getInstructorRevenue, 
  getInstructorStudents, 
  getCoursePerformance 
} from "../controllers/instructor.controller.js";

const router = express.Router();

// All instructor routes require authentication
router.use(verifyFirebaseToken);

// Get instructor analytics overview
router.get("/analytics", getInstructorAnalytics);

// Get instructor revenue data
router.get("/revenue", getInstructorRevenue);

// Get instructor students data
router.get("/students", getInstructorStudents);

// Get course performance metrics
router.get("/course-performance", getCoursePerformance);

export default router;
