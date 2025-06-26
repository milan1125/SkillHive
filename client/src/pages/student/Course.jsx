import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Users, PlayCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advance':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };
  return (
    <Link to={`/course-detail/${course._id}`} className="block group">
      <Card className="overflow-hidden rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] hover:border-blue-300 dark:hover:border-blue-600 hover:bg-white dark:hover:bg-gray-800">
        <div className="relative overflow-hidden">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <PlayCircle className="h-12 w-12 text-white drop-shadow-lg" />
            </div>
          </div>
          
          {/* Course level badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${getLevelColor(course.courseLevel)} font-semibold px-3 py-1.5 rounded-full border-0 shadow-lg backdrop-blur-sm`}>
              {course.courseLevel}
            </Badge>
          </div>
          
          {/* Price badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-900 dark:text-white font-bold px-3 py-1.5 rounded-full shadow-lg border border-gray-200 dark:border-gray-600">
              {course.coursePrice === 0 ? (
                <span className="text-green-600 dark:text-green-400">Free</span>
              ) : (
                <span>{formatPrice(course.coursePrice)}</span>
              )}
            </div>
          </div>        </div>
        
        <CardContent className="p-6 space-y-4">
          {/* Course title */}
          <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {course.courseTitle}
          </h3>
          
          {/* Course description */}
          {course.subTitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {course.subTitle}
            </p>
          )}
          
          {/* Instructor info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-gray-200 dark:ring-gray-700">
              <AvatarImage 
                src={course.creator?.photoUrl || "https://github.com/shadcn.png"} 
                alt={course.creator?.name}
              />
              <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium">
                {course.creator?.name?.charAt(0)?.toUpperCase() || "I"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                {course.creator?.name || "Anonymous Instructor"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Instructor
              </p>
            </div>
          </div>
          
          {/* Course stats */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.8</span>
              </div>
              
              {/* Students count */}
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.enrolledStudents?.length || 0}</span>
              </div>
              
              {/* Duration */}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>12h</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
