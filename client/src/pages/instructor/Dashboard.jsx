import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  DollarSign, 
  Eye, 
  Star,
  Calendar,
  Award
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const {data: purchaseData, isSuccess, isError, isLoading} = useGetPurchasedCoursesQuery();
  const {data: coursesData} = useGetCreatorCourseQuery();

  if(isLoading) return <h1>Loading...</h1>
  if(isError) return <h1 className="text-red-500">Failed to get dashboard data</h1>

  const {purchasedCourse = []} = purchaseData || {};
  const courses = coursesData?.courses || [];

  // Calculate metrics
  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchasedCourse.length;
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(course => course.isPublished).length;
  
  // Mock data for enhanced metrics (you can replace with real API data)
  const totalStudents = purchasedCourse.length; // Unique students
  const avgRating = 4.6;
  const totalViews = 12450;

  // Course performance data
  const coursePerformance = courses.slice(0, 5).map(course => ({
    name: course.courseTitle.substring(0, 15) + "...",
    students: Math.floor(Math.random() * 100) + 10,
    revenue: course.coursePrice || 0,
    rating: (Math.random() * 2 + 3).toFixed(1)
  }));

  // Revenue trend (mock data - replace with real monthly data)
  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: totalRevenue }
  ];

  // Course category distribution
  const categoryData = [
    { name: 'Frontend', value: 35, color: '#8884d8' },
    { name: 'Backend', value: 25, color: '#82ca9d' },
    { name: 'Full Stack', value: 20, color: '#ffc658' },
    { name: 'Data Science', value: 20, color: '#ff7300' }
  ];

  const MetricCard = ({ title, value, icon: Icon, trend, bgColor = "" }) => (
    <Card className={`hover:shadow-lg transition-shadow duration-300 ${bgColor}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center pt-1">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Instructor Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Welcome back! Here's what's happening with your courses.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend="+12% from last month"
        />
        <MetricCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          trend="+8% from last month"
        />
        <MetricCard
          title="Active Courses"
          value={`${publishedCourses}/${totalCourses}`}
          icon={BookOpen}
        />
        <MetricCard
          title="Avg. Rating"
          value={avgRating}
          icon={Star}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Views"
          value={totalViews.toLocaleString()}
          icon={Eye}
        />
        <MetricCard
          title="Completion Rate"
          value="78%"
          icon={Award}
        />
        <MetricCard
          title="Total Sales"
          value={totalSales}
          icon={Calendar}
        />
        <MetricCard
          title="Course Rating"
          value="4.6/5"
          icon={Star}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Revenue Trend */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ fill: "#4f46e5", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Performance */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Top Performing Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coursePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="students" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Course Analytics & Category Distribution */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Course Category Distribution */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Course Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="hover:shadow-lg transition-shadow col-span-2">
          <CardHeader>
            <CardTitle>Recent Course Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.slice(0, 5).map((course, index) => (
                <div key={course._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{course.courseTitle}</p>
                      <p className="text-sm text-gray-500">{course.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={course.isPublished ? "default" : "secondary"}>
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">₹{course.coursePrice || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
