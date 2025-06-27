import verifyFirebaseToken from './verifyFirebaseToken.js';

// Admin middleware that works with Firebase authentication
export const verifyFirebaseAdmin = async (req, res, next) => {
  try {
    // First verify the Firebase token
    await new Promise((resolve, reject) => {
      verifyFirebaseToken(req, res, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    // Check if user has admin role
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required."
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed"
    });
  }
};

export default verifyFirebaseAdmin;
