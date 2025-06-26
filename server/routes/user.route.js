import express from "express";
import { 
    getUserProfile, 
    login, 
    logout, 
    register, 
    updateProfile, 
    getAllUsers, 
    updateUserRole, 
    deleteUser, 
    getUserStats, 
    requestInstructorRole,
    getEnrollmentAnalytics,
    getRevenueAnalytics,
    getTopPerformingCourses,
    getAllEnrollments,
    getAdminCourseDetails
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

// User role management
router.route("/request-instructor").put(isAuthenticated, requestInstructorRole);

// Admin routes for user management
router.route("/admin/users").get(isAdmin, getAllUsers);
router.route("/admin/users/stats").get(isAdmin, getUserStats);
router.route("/admin/users/:userId/role").put(isAdmin, updateUserRole);
router.route("/admin/users/:userId").delete(isAdmin, deleteUser);

// Admin analytics routes
router.route("/admin/analytics/enrollments").get(isAdmin, getEnrollmentAnalytics);
router.route("/admin/analytics/revenue").get(isAdmin, getRevenueAnalytics);
router.route("/admin/analytics/top-courses").get(isAdmin, getTopPerformingCourses);
router.route("/admin/enrollments").get(isAdmin, getAllEnrollments);
router.route("/admin/courses/:courseId/details").get(isAdmin, getAdminCourseDetails);

export default router;