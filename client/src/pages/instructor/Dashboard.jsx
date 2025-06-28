import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { 
  useGetInstructorAnalyticsQuery, 
  useGetInstructorRevenueQuery, 
  useGetCoursePerformanceQuery 
} from "@/features/api/instructorApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Award,
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const [revenuePeriod, setRevenuePeriod] = useState("6months");
  const navigate = useNavigate();
  
  // Fetch real-time data
  const { data: analyticsData, isLoading: analyticsLoading, error: analyticsError, refetch: refetchAnalytics } = useGetInstructorAnalyticsQuery();
  const { data: revenueData, isLoading: revenueLoading, refetch: refetchRevenue } = useGetInstructorRevenueQuery(revenuePeriod);
  const { data: coursePerformanceData, isLoading: performanceLoading, refetch: refetchPerformance } = useGetCoursePerformanceQuery();
  const { data: coursesData, refetch: refetchCourses } = useGetCreatorCourseQuery();

  // Refresh all data
  const handleRefresh = () => {
    refetchAnalytics();
    refetchRevenue();
    refetchPerformance();
    refetchCourses();
  };

  // Loading state
  if (analyticsLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (analyticsError) {
    return (
      <div className="p-6 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Failed to load dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Please try refreshing the page</p>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>
    );
  }

  const analytics = analyticsData?.analytics || {};
  const courses = coursesData?.courses || [];
  const revenueChartData = revenueData?.revenueData || [];
  const coursePerformance = coursePerformanceData?.coursePerformance || [];
  const categoryData = coursePerformanceData?.categoryData || [];

  // Prepare pie chart data with colors
  const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];
  const categoryChartData = categoryData.map((item, index) => ({
    ...item,
    color: pieColors[index % pieColors.length]
  }));

  const MetricCard = ({ title, value, icon: Icon, trend, trendValue, subtitle, bgColor = "" }) => (
    <Card className={`hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 ${bgColor}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</CardTitle>
        <Icon className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        )}
        {trend && trendValue !== undefined && (
          <div className="flex items-center pt-1">
            {trend === 'up' ? (
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
            ) : trend === 'down' ? (
              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
            ) : (
              <TrendingUp className="h-3 w-3 text-gray-500 mr-1" />
            )}
            <span className={`text-xs ${
              trend === 'up' ? 'text-green-500' : 
              trend === 'down' ? 'text-red-500' : 
              'text-gray-500'
            }`}>
              {Math.abs(trendValue)}% {trend === 'up' ? 'increase' : trend === 'down' ? 'decrease' : 'change'} this month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Determine trend direction
  const getTrend = (value) => {
    if (value > 0) return 'up';
    if (value < 0) return 'down';
    return 'neutral';
  };

  return (
    <div className="p-6 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Instructor Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Welcome back! Here's what's happening with your courses.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Last updated</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value={`₹${analytics.totalRevenue?.toLocaleString() || '0'}`}
            icon={DollarSign}
            trend={getTrend(analytics.revenueGrowth)}
            trendValue={analytics.revenueGrowth}
            bgColor="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
          />
          <MetricCard
            title="Total Students"
            value={analytics.totalStudents || 0}
            icon={Users}
            subtitle={`${analytics.totalSales || 0} total enrollments`}
            bgColor="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
          />
          <MetricCard
            title="Active Courses"
            value={`${analytics.publishedCourses || 0}/${analytics.totalCourses || 0}`}
            icon={BookOpen}
            subtitle={`${analytics.totalCourses - analytics.publishedCourses || 0} in draft`}
            bgColor="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
          />
          <MetricCard
            title="Average Rating"
            value={analytics.avgRating || '0.0'}
            icon={Star}
            subtitle="Based on student feedback"
            bgColor="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="This Month Revenue"
            value={`₹${analytics.currentMonthRevenue?.toLocaleString() || '0'}`}
            icon={Calendar}
            trend={getTrend(analytics.revenueGrowth)}
            trendValue={analytics.revenueGrowth}
          />
          <MetricCard
            title="Total Sales"
            value={analytics.totalSales || 0}
            icon={Award}
            subtitle="Course purchases"
          />
          <MetricCard
            title="Course Completion"
            value="82%"
            icon={TrendingUp}
            subtitle="Average completion rate"
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Revenue Trend */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <TrendingUp className="h-5 w-5" />
                  Revenue Trend
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Track your earnings over time
                </p>
              </div>
              <Select value={revenuePeriod} onValueChange={setRevenuePeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 days</SelectItem>
                  <SelectItem value="30days">30 days</SelectItem>
                  <SelectItem value="6months">6 months</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              {revenueLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#6b7280" 
                      className="dark:stroke-gray-400"
                    />
                    <YAxis 
                      stroke="#6b7280" 
                      className="dark:stroke-gray-400"
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #d1d5db',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{ fill: "#4f46e5", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Course Performance */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <BookOpen className="h-5 w-5" />
                Top Performing Courses
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your best courses by revenue
              </p>
            </CardHeader>
            <CardContent>
              {performanceLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : coursePerformance.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={coursePerformance.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
                    <XAxis 
                      dataKey="courseTitle" 
                      stroke="#6b7280"
                      className="dark:stroke-gray-400"
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      className="dark:stroke-gray-400"
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === 'totalRevenue') return [`₹${value.toLocaleString()}`, 'Revenue'];
                        if (name === 'totalEnrollments') return [value, 'Students'];
                        return [value, name];
                      }}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #d1d5db',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="totalRevenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No course performance data available</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Course Categories Distribution */}
        {categoryChartData.length > 0 && (
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Award className="h-5 w-5" />
                Course Categories Distribution
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Breakdown of your courses by category
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, 'Courses']} />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-3">
                  {categoryChartData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {category.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {category.count} courses
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ₹{category.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructor's Courses Section */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <BookOpen className="h-5 w-5" />
                My Courses
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Manage and view your course collection
              </p>
            </div>
            <Button 
              onClick={() => navigate('/instructor/course/create')} 
              className="bg-primary hover:bg-primary/90"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </CardHeader>
          <CardContent>
            {courses.length > 0 ? (
              <div className="space-y-4">
                {courses.slice(0, 6).map((course) => (
                  <div key={course._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-lg flex items-center justify-center">
                        {course.courseThumbnail ? (
                          <img 
                            src={course.courseThumbnail} 
                            alt={course.courseTitle}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {course.courseTitle}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {course.category}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>{course.lectures?.length || 0} lectures</span>
                          <span>•</span>
                          <span>₹{course.coursePrice || 0}</span>
                          <span>•</span>
                          <span>Created {new Date(course.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={course.isPublished ? "default" : "secondary"}
                        className={course.isPublished ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : ""}
                      >
                        {course.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/instructor/course/${course._id}`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
                
                {courses.length > 6 && (
                  <div className="text-center pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/instructor/course')}
                    >
                      View All Courses ({courses.length})
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No courses yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start creating your first course to share your knowledge with students.
                </p>
                <Button 
                  onClick={() => navigate('/instructor/course/create')}
                  className="bg-primary hover:bg-primary/90"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create Your First Course
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Common tasks to help you manage your courses
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                className="h-auto p-4 flex flex-col items-center gap-2" 
                variant="outline"
                onClick={() => navigate('/instructor/course/create')}
              >
                <BookOpen className="h-6 w-6" />
                <span>Create Course</span>
              </Button>
              <Button 
                className="h-auto p-4 flex flex-col items-center gap-2" 
                variant="outline"
                onClick={() => navigate('/instructor/students')}
              >
                <Users className="h-6 w-6" />
                <span>View Students</span>
              </Button>
              <Button 
                className="h-auto p-4 flex flex-col items-center gap-2" 
                variant="outline"
                onClick={() => navigate('/instructor/analytics')}
              >
                <Eye className="h-6 w-6" />
                <span>Analytics</span>
              </Button>
              <Button 
                className="h-auto p-4 flex flex-col items-center gap-2" 
                variant="outline"
                onClick={() => navigate('/instructor/course')}
              >
                <Star className="h-6 w-6" />
                <span>All Courses</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
