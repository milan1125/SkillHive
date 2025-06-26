import React, { useState } from "react";
import { 
  useGetEnrollmentAnalyticsQuery, 
  useGetRevenueAnalyticsQuery,
  useGetTopPerformingCoursesQuery,
  useGetAllEnrollmentsQuery 
} from "@/features/api/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LoadingSpinner from "@/components/LoadingSpinner";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  BookOpen, 
  Calendar,
  Search,
  Eye,
  Award,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

const AdminAnalytics = () => {
  const [period, setPeriod] = useState('30d');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: enrollmentData, isLoading: enrollmentLoading } = useGetEnrollmentAnalyticsQuery();
  const { data: revenueData, isLoading: revenueLoading } = useGetRevenueAnalyticsQuery({ period });
  const { data: topCoursesData, isLoading: topCoursesLoading } = useGetTopPerformingCoursesQuery({ limit: 10 });
  const { data: enrollmentsData, isLoading: enrollmentsLoading } = useGetAllEnrollmentsQuery({
    page: currentPage,
    limit: 10,
    search: searchTerm
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (enrollmentLoading || revenueLoading || topCoursesLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive insights into platform performance and user engagement
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Enrollments</CardTitle>
            <Users className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {enrollmentData?.analytics?.totalEnrollments || 0}
            </div>
            <div className="flex items-center mt-2 text-sm opacity-90">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+{enrollmentData?.analytics?.enrollmentGrowth || 0}% this {period}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(revenueData?.analytics?.totalRevenue || 0)}
            </div>
            <div className="flex items-center mt-2 text-sm opacity-90">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+{revenueData?.analytics?.revenueGrowth || 0}% this {period}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Active Courses</CardTitle>
            <BookOpen className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {enrollmentData?.analytics?.activeCourses || 0}
            </div>
            <div className="flex items-center mt-2 text-sm opacity-90">
              <Activity className="h-4 w-4 mr-1" />
              <span>Courses with enrollments</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Avg. Revenue per Course</CardTitle>
            <BarChart3 className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(revenueData?.analytics?.avgRevenuePerCourse || 0)}
            </div>
            <div className="flex items-center mt-2 text-sm opacity-90">
              <PieChart className="h-4 w-4 mr-1" />
              <span>Average earnings</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Top Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Enrollment Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrollmentData?.analytics?.enrollmentTimeline?.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{formatDate(item.date)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.enrollments} new enrollments
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {formatCurrency(item.revenue)}
                  </Badge>
                </div>
              )) || (
                <p className="text-center text-gray-500 py-8">No enrollment data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Top Performing Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCoursesData?.courses?.map((course, index) => (
                <div key={course._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="font-bold">
                      #{index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{course.courseTitle}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {course.enrollmentCount || 0} students • {formatCurrency(course.coursePrice)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {formatCurrency(course.totalRevenue || 0)}
                    </p>
                    <p className="text-xs text-gray-500">Total Revenue</p>
                  </div>
                </div>
              )) || (
                <p className="text-center text-gray-500 py-8">No course data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Enrollments Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Recent Enrollments
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search enrollments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {enrollmentsLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollmentsData?.enrollments?.map((enrollment) => (
                    <TableRow key={enrollment._id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                              {enrollment.student?.name?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{enrollment.student?.name}</p>
                            <p className="text-xs text-gray-500">{enrollment.student?.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{enrollment.course?.courseTitle}</p>
                          <p className="text-xs text-gray-500">{enrollment.course?.category}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{enrollment.course?.creator?.name}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{formatDate(enrollment.enrollmentDate)}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-green-600">
                          {formatCurrency(enrollment.course?.coursePrice)}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="success">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) || (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        No enrollments found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination */}
              {enrollmentsData?.pagination && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, enrollmentsData.pagination.totalEnrollments)} of {enrollmentsData.pagination.totalEnrollments} enrollments
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={!enrollmentsData.pagination.hasPrevPage}
                    >
                      Previous
                    </Button>
                    <span className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                      {currentPage} of {enrollmentsData.pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={!enrollmentsData.pagination.hasNextPage}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
