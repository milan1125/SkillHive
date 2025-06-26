import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, Mail, Shield, Edit, BookOpen } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  console.log(data);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "✅ Profile updated successfully!", {
        description: "Your profile information has been saved.",
        duration: 3000,
      });
    }
    if (isError) {
      toast.error("❌ " + (error.message || "Failed to update profile"), {
        description: "Please check your information and try again.",
        duration: 4000,
      });
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading profile...</p>
      </div>
    </div>
  );

  const user = data && data.user;

  console.log(user);
  
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
            <User className="h-5 w-5" />
            <span>Your Profile</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            Welcome back,
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in"> {user.name.split(' ')[0]}</span>
          </h1>
        </div>

        {/* Profile Card */}
        <div className="glass rounded-3xl p-10 mb-12 shadow-2xl border border-white/20 dark:border-gray-700/50 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 lg:h-40 lg:w-40 mb-6 ring-4 ring-blue-200 dark:ring-blue-800 shadow-2xl">
                <AvatarImage
                  src={user?.photoUrl || "https://github.com/shadcn.png"}
                  alt={user.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-3xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Full Name</h3>
                  </div>
                  <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">{user.name}</p>
                </div>

                <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Email Address</h3>
                  </div>
                  <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">{user.email}</p>
                </div>

                <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Role</h3>
                  </div>
                  <span className={`inline-flex px-4 py-2 rounded-full text-sm font-bold ${
                    user.role === 'instructor' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {user.role.toUpperCase()}
                  </span>
                </div>

                <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Enrolled Courses</h3>
                  </div>
                  <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {user.enrolledCourses?.length || 0}
                  </p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Edit className="mr-2 h-6 w-6" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>                  <DialogContent className="sm:max-w-md glass border-white/20 dark:border-gray-700/50">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="photo" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Profile Photo</Label>
                        <Input
                          id="photo"
                          onChange={onChangeHandler}
                          type="file"
                          accept="image/*"
                          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        disabled={updateUserIsLoading}
                        onClick={updateUserHandler}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        {updateUserIsLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                            Updating...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Learning Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Continue learning and track your progress
            </p>
          </div>

          {user.enrolledCourses.length === 0 ? (
            <div className="text-center py-24">
              <div className="glass rounded-3xl p-20 max-w-2xl mx-auto shadow-2xl border border-white/20 dark:border-gray-700/50 backdrop-blur-xl">
                <div className="mb-12">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <BookOpen className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Ready to start learning?
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                    You haven't enrolled in any courses yet. Explore our course library and start your learning journey today!
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
              {user.enrolledCourses.map((course, index) => (
                <div 
                  key={course._id} 
                  className="animate-fade-in group" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Course course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
