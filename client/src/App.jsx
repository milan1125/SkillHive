import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/instructor/Sidebar";
import Dashboard from "./pages/instructor/Dashboard";
import CourseTable from "./pages/instructor/course/CourseTable";
import AddCourse from "./pages/instructor/course/AddCourse";
import EditCourse from "./pages/instructor/course/EditCourse";
import CreateLecture from "./pages/instructor/lecture/CreateLecture";
import EditLecture from "./pages/instructor/lecture/EditLecture";
import Students from "./pages/instructor/Students";
import Analytics from "./pages/instructor/Analytics";
import Messages from "./pages/instructor/Messages";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import RouteErrorBoundary from "./components/RouteErrorBoundary";

import {
  AdminRoute,
  AuthenticatedUser,
  InstructorRoute,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";
import AdminSidebar from "./pages/admin/AdminSidebar";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import AdminCourseManagement from "./pages/admin/AdminCourseManagement";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminCourseDetails from "./pages/admin/AdminCourseDetails";

const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ThemeProvider>
          <AuthenticatedUser>
            <Landing />
          </AuthenticatedUser>
        </ThemeProvider>
      ),
    },
    {
      path: "/login",
      element: (
        <ThemeProvider>
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        </ThemeProvider>
      ),
    },
    {
      path: "/",
      element: (
        <ThemeProvider>
          <MainLayout />
        </ThemeProvider>
      ),
    children: [
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
            <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },

      // instructor routes
      {
        path: "instructor",
        element: (
          <InstructorRoute>
            <Sidebar />
          </InstructorRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
          {
            path: "students",
            element: <Students />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "messages",
            element: <Messages />,
          },
        ],
      },

      // admin routes
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminSidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "users",
            element: <AdminUserManagement />,
          },
          {
            path: "courses",
            element: <AdminCourseManagement />,
          },
          {
            path: "courses/:courseId/details",
            element: <AdminCourseDetails />,
          },
          {
            path: "analytics",
            element: <AdminAnalytics />,
          },
          {
            path: "settings",
            element: <AdminSettings />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <ThemeProvider>
        <RouteErrorBoundary />
      </ThemeProvider>
    ),
  },
]);
  console.log("App Router initialized");
function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
