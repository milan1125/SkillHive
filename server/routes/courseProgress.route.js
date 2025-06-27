import express from "express";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";
import { getCourseProgress, markAsCompleted, markAsInCompleted, updateLectureProgress } from "../controllers/courseProgress.controller.js";

const router = express.Router();

router.route("/:courseId").get(verifyFirebaseToken, getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(verifyFirebaseToken, updateLectureProgress);
router.route("/:courseId/complete").post(verifyFirebaseToken, markAsCompleted);
router.route("/:courseId/incomplete").post(verifyFirebaseToken, markAsInCompleted);

export default router;