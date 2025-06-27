import express from "express";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";
import verifyFirebaseAdmin from "../middlewares/verifyFirebaseAdmin.js";
import verifyFirebaseInstructor from "../middlewares/verifyFirebaseInstructor.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeLecture, searchCourse, togglePublishCourse, getAllCoursesForAdmin, toggleCourseStatus, deleteCourseByAdmin, getCourseStats } from "../controllers/course.controller.js";
import upload from "../utils/multer.js";
const router = express.Router();

// Course management routes (instructor access)
router.route("/").post(verifyFirebaseInstructor, createCourse);
router.route("/").get(verifyFirebaseInstructor, getCreatorCourses);
router.route("/:courseId").put(verifyFirebaseInstructor, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").patch(verifyFirebaseInstructor, togglePublishCourse);

// Lecture management routes (instructor access)
router.route("/:courseId/lecture").post(verifyFirebaseInstructor, createLecture);
router.route("/:courseId/lecture").get(verifyFirebaseInstructor, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(verifyFirebaseInstructor, editLecture);
router.route("/lecture/:lectureId").delete(verifyFirebaseInstructor, removeLecture);
router.route("/lecture/:lectureId").get(verifyFirebaseToken, getLectureById);

// Public and student routes
router.route("/search").get(searchCourse);
router.route("/published-courses").get(getPublishedCourse);
router.route("/:courseId").get(verifyFirebaseToken, getCourseById);

// Admin routes for course management
router.route("/admin/courses").get(verifyFirebaseAdmin, getAllCoursesForAdmin);
router.route("/admin/courses/stats").get(verifyFirebaseAdmin, getCourseStats);
router.route("/admin/courses/:courseId/toggle-status").patch(verifyFirebaseAdmin, toggleCourseStatus);
router.route("/admin/courses/:courseId").delete(verifyFirebaseAdmin, deleteCourseByAdmin);

export default router;