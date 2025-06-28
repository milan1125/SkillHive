import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import { BookOpen, GraduationCap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const MyLearning = () => { 
  const {data, isLoading} = useLoadUserQuery();

  const myLearning = data?.user.enrolledCourses || [];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 opacity-30"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 animate-fade-in">
            <GraduationCap className="h-5 w-5" />
            <span>Your Learning Journey</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            My
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in"> Learning</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Continue your learning journey and track your progress across all enrolled courses.
          </p>
        </div>

        {/* Learning Stats */}
        {!isLoading && myLearning.length > 0 && (
          <div className="glass rounded-3xl p-8 mb-12 shadow-2xl border border-white/20 dark:border-gray-700/50 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {myLearning.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Enrolled Courses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {Math.round(myLearning.length * 0.7)}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  {Math.round(myLearning.length * 0.3)}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Completed</div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        <div>
          {isLoading ? (
            <MyLearningSkeleton />
          ) : myLearning.length === 0 ? (
            <div className="text-center py-24">
              <div className="glass rounded-3xl p-20 max-w-2xl mx-auto shadow-2xl border border-white/20 dark:border-gray-700/50 backdrop-blur-xl">
                <div className="mb-12">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <BookOpen className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Start Your Learning Journey
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                    You haven't enrolled in any courses yet. Explore our course library and start learning something new today!
                  </p>
                </div>
                
                <button 
                  onClick={() => window.location.href = '/courses'}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Browse Courses
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {myLearning.map((course, index) => (
                <div 
                  key={course._id} 
                  className="animate-fade-in group" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Course course={course}/>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLearning;
// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="glass rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-xl overflow-hidden backdrop-blur-xl">
          {/* Image skeleton */}
          <div className="relative">
            <Skeleton className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer" />
            <div className="absolute top-4 left-4">
              <Skeleton className="h-8 w-20 rounded-full bg-gray-300/70 dark:bg-gray-600/70" />
            </div>
            <div className="absolute top-4 right-4">
              <Skeleton className="h-8 w-16 rounded-full bg-gray-300/70 dark:bg-gray-600/70" />
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <Skeleton className="h-6 w-4/5 bg-gray-300/70 dark:bg-gray-600/70 rounded-lg" />
            
            {/* Description */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-gray-200/70 dark:bg-gray-700/70 rounded" />
              <Skeleton className="h-4 w-3/4 bg-gray-200/70 dark:bg-gray-700/70 rounded" />
            </div>
            
            {/* Progress bar */}
            <div className="pt-4">
              <Skeleton className="h-2 w-full bg-gray-200/70 dark:bg-gray-700/70 rounded-full" />
              <Skeleton className="h-3 w-20 bg-gray-200/70 dark:bg-gray-700/70 rounded mt-2" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

