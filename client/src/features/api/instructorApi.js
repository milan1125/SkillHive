import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "@/config/firebase";

const INSTRUCTOR_API = "https://skill-hive-drab.vercel.app/api/v1";

export const instructorApi = createApi({
  reducerPath: "instructorApi",
  tagTypes: ["InstructorAnalytics"],
  baseQuery: fetchBaseQuery({
    baseUrl: INSTRUCTOR_API,
    credentials: "include",
    prepareHeaders: async (headers) => {
      try {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          headers.set('Authorization', `Bearer ${token}`);
        }
      } catch (error) {
        console.error('Error getting Firebase token:', error);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // Get instructor analytics
    getInstructorAnalytics: builder.query({
      query: () => ({
        url: "/instructor/analytics",
        method: "GET",
      }),
      providesTags: ["InstructorAnalytics"],
    }),
    
    // Get instructor revenue data
    getInstructorRevenue: builder.query({
      query: (period = "6months") => ({
        url: `/instructor/revenue?period=${period}`,
        method: "GET",
      }),
      providesTags: ["InstructorAnalytics"],
    }),
    
    // Get instructor students data
    getInstructorStudents: builder.query({
      query: () => ({
        url: "/instructor/students",
        method: "GET",
      }),
      providesTags: ["InstructorAnalytics"],
    }),
    
    // Get course performance metrics
    getCoursePerformance: builder.query({
      query: () => ({
        url: "/instructor/course-performance",
        method: "GET",
      }),
      providesTags: ["InstructorAnalytics"],
    }),
  }),
});

export const {
  useGetInstructorAnalyticsQuery,
  useGetInstructorRevenueQuery,
  useGetInstructorStudentsQuery,
  useGetCoursePerformanceQuery,
} = instructorApi;
