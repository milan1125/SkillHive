import express from "express";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/checkout/create-checkout-session").post(verifyFirebaseToken, createCheckoutSession);
router.route("/webhook").post(express.raw({type:"application/json"}), stripeWebhook);
router.route("/course/:courseId/detail-with-status").get(verifyFirebaseToken,getCourseDetailWithPurchaseStatus);

router.route("/").get(verifyFirebaseToken,getAllPurchasedCourse);

export default router;