import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle, Search, BookOpen, Filter as FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCatgories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery:query,
    categories:selectedCategories,
    sortByPrice
  });

  const isEmpty = !isLoading && data?.courses.length === 0;
  const handleFilterChange = (categories, price) => {
    setSelectedCatgories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 opacity-30"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 animate-fade-in">
            <Search className="h-5 w-5" />
            <span>Search Results</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
            Results for 
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"> "{query}"</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Showing results for <span className="font-bold text-blue-600 dark:text-blue-400">"{query}"</span>
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="xl:w-80 w-full flex-shrink-0">
            <div className="glass rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-gray-700/50 backdrop-blur-xl sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <FilterIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
              </div>
              <Filter handleFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1 space-y-6 min-w-0">
            {/* Results Header */}
            {!isLoading && data?.courses && (
              <div className="flex items-center justify-between p-6 glass rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {data.courses.length} courses found
                  </span>
                </div>
              </div>
            )}

            {/* Results Content */}
            <div className="space-y-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <CourseSkeleton key={idx} />                ))
              ) : isEmpty ? (
                <CourseNotFound query={query} />
              ) : (
                data?.courses?.map((course) => (
                  <div key={course._id} className="animate-fade-in">
                    <SearchResult course={course} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = ({ query }) => {
  return (
    <div className="text-center py-24">
      <div className="glass rounded-3xl p-20 max-w-2xl mx-auto shadow-2xl border border-white/20 dark:border-gray-700/50 backdrop-blur-xl">
        <div className="mb-12">
          <div className="w-32 h-32 bg-gradient-to-br from-red-100 via-orange-50 to-red-100 dark:from-red-900/30 dark:via-orange-900/20 dark:to-red-900/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <AlertCircle className="h-16 w-16 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            No courses found
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
            We couldn't find any courses matching "<span className="font-bold text-red-600 dark:text-red-400">{query}</span>". Try adjusting your search terms or filters.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/courses">
            <Button 
              variant="outline"
              className="border-2 border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Browse All Courses
            </Button>
          </Link>
          <Link to="/course/search/?query=">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Try Different Search
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="glass rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-xl overflow-hidden backdrop-blur-xl p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image skeleton */}
          <div className="w-full md:w-64 h-48 md:h-32 flex-shrink-0">
            <Skeleton className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl" />
          </div>
          
          {/* Content skeleton */}
          <div className="flex-1 space-y-4">
            {/* Title */}
            <Skeleton className="h-6 w-4/5 bg-gray-300/70 dark:bg-gray-600/70 rounded-lg" />
            
            {/* Description */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-gray-200/70 dark:bg-gray-700/70 rounded" />
              <Skeleton className="h-4 w-3/4 bg-gray-200/70 dark:bg-gray-700/70 rounded" />
            </div>
            
            {/* Stats and price */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-6">
                <Skeleton className="h-4 w-12 bg-gray-200/70 dark:bg-gray-700/70 rounded" />
                <Skeleton className="h-4 w-8 bg-gray-200/70 dark:bg-gray-700/70 rounded" />
                <Skeleton className="h-4 w-10 bg-gray-200/70 dark:bg-gray-700/70 rounded" />
              </div>
              <Skeleton className="h-8 w-20 bg-gray-300/70 dark:bg-gray-600/70 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
