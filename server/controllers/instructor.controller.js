import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { User } from "../models/user.model.js";

// Get instructor analytics overview
export const getInstructorAnalytics = async (req, res) => {
  try {
    const instructorId = req.user._id;

    // Get instructor's courses
    const courses = await Course.find({ creator: instructorId });
    const courseIds = courses.map(course => course._id);

    // Get all purchases for instructor's courses
    const purchases = await CoursePurchase.find({
      courseId: { $in: courseIds },
      status: "completed"
    }).populate('courseId').populate('userId');

    // Calculate metrics
    const totalRevenue = purchases.reduce((sum, purchase) => sum + (purchase.amount || 0), 0);
    const totalSales = purchases.length;
    const totalCourses = courses.length;
    const publishedCourses = courses.filter(course => course.isPublished).length;
    
    // Get unique students
    const uniqueStudents = [...new Set(purchases.map(p => p.userId._id.toString()))];
    const totalStudents = uniqueStudents.length;

    // Calculate average rating (mock for now - can be enhanced with actual ratings)
    const avgRating = 4.6;

    // Get current month revenue
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentMonthRevenue = purchases
      .filter(p => {
        const purchaseDate = new Date(p.createdAt);
        return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
      })
      .reduce((sum, purchase) => sum + (purchase.amount || 0), 0);

    // Calculate growth (comparing with previous month)
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const previousMonthRevenue = purchases
      .filter(p => {
        const purchaseDate = new Date(p.createdAt);
        return purchaseDate.getMonth() === previousMonth && purchaseDate.getFullYear() === previousYear;
      })
      .reduce((sum, purchase) => sum + (purchase.amount || 0), 0);

    const revenueGrowth = previousMonthRevenue > 0 
      ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1)
      : 0;

    return res.status(200).json({
      success: true,
      analytics: {
        totalRevenue,
        totalSales,
        totalCourses,
        publishedCourses,
        totalStudents,
        avgRating,
        currentMonthRevenue,
        revenueGrowth: parseFloat(revenueGrowth)
      }
    });
  } catch (error) {
    console.error("Get instructor analytics error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get instructor analytics"
    });
  }
};

// Get instructor revenue data for charts
export const getInstructorRevenue = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const { period = "6months" } = req.query;

    // Get instructor's courses
    const courses = await Course.find({ creator: instructorId });
    const courseIds = courses.map(course => course._id);

    // Get all purchases for instructor's courses
    const purchases = await CoursePurchase.find({
      courseId: { $in: courseIds },
      status: "completed"
    }).populate('courseId');

    // Calculate date range based on period
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case "7days":
        startDate.setDate(now.getDate() - 7);
        break;
      case "30days":
        startDate.setDate(now.getDate() - 30);
        break;
      case "6months":
        startDate.setMonth(now.getMonth() - 6);
        break;
      case "1year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 6);
    }

    // Filter purchases by date range
    const filteredPurchases = purchases.filter(p => new Date(p.createdAt) >= startDate);

    // Group revenue by month
    const revenueByMonth = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    filteredPurchases.forEach(purchase => {
      const date = new Date(purchase.createdAt);
      const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      
      if (!revenueByMonth[monthKey]) {
        revenueByMonth[monthKey] = 0;
      }
      revenueByMonth[monthKey] += purchase.amount || 0;
    });

    // Convert to array format for charts
    const revenueData = Object.entries(revenueByMonth).map(([month, revenue]) => ({
      month: month.split(' ')[0], // Just month name
      revenue,
      fullDate: month
    }));

    return res.status(200).json({
      success: true,
      revenueData: revenueData.sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate))
    });
  } catch (error) {
    console.error("Get instructor revenue error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get instructor revenue data"
    });
  }
};

// Get instructor students data
export const getInstructorStudents = async (req, res) => {
  try {
    const instructorId = req.user._id;

    // Get instructor's courses
    const courses = await Course.find({ creator: instructorId });
    const courseIds = courses.map(course => course._id);

    // Get all purchases for instructor's courses with user details
    const purchases = await CoursePurchase.find({
      courseId: { $in: courseIds },
      status: "completed"
    }).populate('courseId').populate('userId');

    // Get unique students with their data
    const studentsMap = new Map();
    
    purchases.forEach(purchase => {
      const studentId = purchase.userId._id.toString();
      if (!studentsMap.has(studentId)) {
        studentsMap.set(studentId, {
          id: studentId,
          name: purchase.userId.name,
          email: purchase.userId.email,
          photoUrl: purchase.userId.photoUrl,
          enrolledCourses: [],
          totalSpent: 0,
          lastPurchase: purchase.createdAt
        });
      }
      
      const student = studentsMap.get(studentId);
      student.enrolledCourses.push({
        courseId: purchase.courseId._id,
        courseTitle: purchase.courseId.courseTitle,
        purchaseDate: purchase.createdAt,
        amount: purchase.amount
      });
      student.totalSpent += purchase.amount || 0;
      
      // Update last purchase date if this is more recent
      if (new Date(purchase.createdAt) > new Date(student.lastPurchase)) {
        student.lastPurchase = purchase.createdAt;
      }
    });

    const students = Array.from(studentsMap.values());

    return res.status(200).json({
      success: true,
      students,
      totalStudents: students.length
    });
  } catch (error) {
    console.error("Get instructor students error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get instructor students data"
    });
  }
};

// Get course performance metrics
export const getCoursePerformance = async (req, res) => {
  try {
    const instructorId = req.user._id;

    // Get instructor's courses with detailed data
    const courses = await Course.find({ creator: instructorId });

    // Get purchase data for each course
    const coursePerformance = await Promise.all(
      courses.map(async (course) => {
        const purchases = await CoursePurchase.find({
          courseId: course._id,
          status: "completed"
        });

        const totalRevenue = purchases.reduce((sum, p) => sum + (p.amount || 0), 0);
        const totalEnrollments = purchases.length;

        // Get unique students for this course
        const uniqueStudents = [...new Set(purchases.map(p => p.userId.toString()))];

        return {
          courseId: course._id,
          courseTitle: course.courseTitle,
          category: course.category,
          isPublished: course.isPublished,
          coursePrice: course.coursePrice || 0,
          totalRevenue,
          totalEnrollments,
          uniqueStudents: uniqueStudents.length,
          lectureCount: course.lectures ? course.lectures.length : 0,
          createdAt: course.createdAt,
          // Mock rating data (can be enhanced with actual rating system)
          avgRating: (Math.random() * 2 + 3).toFixed(1),
          // Calculate completion rate (mock data for now)
          completionRate: Math.floor(Math.random() * 40 + 60) // 60-100%
        };
      })
    );

    // Sort by revenue (highest first)
    coursePerformance.sort((a, b) => b.totalRevenue - a.totalRevenue);

    // Get category distribution
    const categoryStats = {};
    courses.forEach(course => {
      const category = course.category || 'Other';
      if (!categoryStats[category]) {
        categoryStats[category] = {
          name: category,
          count: 0,
          revenue: 0
        };
      }
      categoryStats[category].count++;
    });

    // Add revenue to category stats
    coursePerformance.forEach(course => {
      const category = course.category || 'Other';
      if (categoryStats[category]) {
        categoryStats[category].revenue += course.totalRevenue;
      }
    });

    const categoryData = Object.values(categoryStats);

    return res.status(200).json({
      success: true,
      coursePerformance,
      categoryData,
      totalCourses: courses.length
    });
  } catch (error) {
    console.error("Get course performance error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get course performance data"
    });
  }
};
