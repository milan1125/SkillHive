import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Download,
  Calendar,
  Target,
  Award
} from "lucide-react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30days');

  // Mock data - replace with real API data
  const studentEngagementData = [
    { date: '2024-01-01', students: 45, completions: 12, watchTime: 180 },
    { date: '2024-01-02', students: 52, completions: 15, watchTime: 220 },
    { date: '2024-01-03', students: 48, completions: 18, watchTime: 195 },
    { date: '2024-01-04', students: 65, completions: 22, watchTime: 280 },
    { date: '2024-01-05', students: 58, completions: 19, watchTime: 245 },
    { date: '2024-01-06', students: 72, completions: 25, watchTime: 320 },
    { date: '2024-01-07', students: 68, completions: 28, watchTime: 295 }
  ];

  const coursePerformanceData = [
    { course: 'React Fundamentals', students: 324, completion: 78, rating: 4.8, revenue: 45200 },
    { course: 'Advanced JavaScript', students: 256, completion: 65, rating: 4.6, revenue: 38400 },
    { course: 'Node.js Basics', students: 189, completion: 82, rating: 4.7, revenue: 28350 },
    { course: 'Full Stack Dev', students: 298, completion: 59, rating: 4.5, revenue: 44700 },
    { course: 'React Native', students: 156, completion: 71, rating: 4.4, revenue: 23400 }
  ];

  const deviceData = [
    { name: 'Desktop', value: 65, color: '#8884d8' },
    { name: 'Mobile', value: 25, color: '#82ca9d' },
    { name: 'Tablet', value: 10, color: '#ffc658' }
  ];

  const timeSpentData = [
    { hour: '9 AM', minutes: 45 },
    { hour: '10 AM', minutes: 78 },
    { hour: '11 AM', minutes: 92 },
    { hour: '12 PM', minutes: 125 },
    { hour: '1 PM', minutes: 98 },
    { hour: '2 PM', minutes: 156 },
    { hour: '3 PM', minutes: 134 },
    { hour: '4 PM', minutes: 187 },
    { hour: '5 PM', minutes: 234 },
    { hour: '6 PM', minutes: 198 },
    { hour: '7 PM', minutes: 276 },
    { hour: '8 PM', minutes: 321 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Course Analytics</h1>
          <p className="text-gray-600 dark:text-gray-300">Detailed insights into your course performance</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,485</div>
            <p className="text-xs text-green-600">+15.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Watch Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5 min</div>
            <p className="text-xs text-blue-600">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73.2%</div>
            <p className="text-xs text-green-600">+5.4% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <p className="text-xs text-yellow-600">+0.2 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Student Engagement Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Student Engagement Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={studentEngagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="students" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="completions" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Peak Learning Hours */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Peak Learning Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeSpentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} min`, 'Time Spent']} />
                <Bar dataKey="minutes" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Performance Comparison */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Course Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coursePerformanceData.map((course, index) => (
                <div key={index} className="p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{course.course}</h4>
                    <Badge variant="outline">₹{course.revenue.toLocaleString()}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Students:</span>
                      <div className="font-medium">{course.students}</div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Completion:</span>
                      <div className="font-medium">{course.completion}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Rating:</span>
                      <div className="font-medium">{course.rating}/5</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${course.completion}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Detailed Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">89.5%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Video Completion Rate</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">6.8</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Avg. Sessions per Student</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">45 min</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Avg. Session Duration</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">92%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Student Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
