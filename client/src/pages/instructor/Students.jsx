import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  MessageSquare, 
  MoreVertical,
  Calendar,
  BookOpen,
  TrendingUp
} from "lucide-react";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Mock data - replace with real API data
  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      enrolledCourses: ["React Fundamentals", "Advanced JavaScript"],
      totalCourses: 2,
      completedCourses: 1,
      lastActive: "2 hours ago",
      progress: 75,
      joinDate: "2024-01-15",
      avatar: "AJ"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      enrolledCourses: ["Node.js Basics"],
      totalCourses: 1,
      completedCourses: 0,
      lastActive: "1 day ago",
      progress: 45,
      joinDate: "2024-02-20",
      avatar: "BS"
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      enrolledCourses: ["Full Stack Development", "React Fundamentals"],
      totalCourses: 2,
      completedCourses: 2,
      lastActive: "5 minutes ago",
      progress: 100,
      joinDate: "2023-12-10",
      avatar: "CD"
    }
  ];

  const courses = ["All Courses", "React Fundamentals", "Advanced JavaScript", "Node.js Basics", "Full Stack Development"];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || 
                         student.enrolledCourses.some(course => course === selectedCourse);
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Monitor and engage with your students</p>
        </div>
        <Button>
          <Mail className="h-4 w-4 mr-2" />
          Send Announcement
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+5% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.slice(1).map(course => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Enrolled Courses</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-700">
                          {student.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {student.enrolledCourses.map((course, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">{student.lastActive}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">{student.joinDate}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;
