import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useFirebaseAuthMutation,
  useFirebaseSignupMutation,
  useFirebaseLogoutMutation
} from "@/features/api/authApi";
import { Loader2, Eye, EyeOff, BookOpen, Users, Award, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DarkMode from "@/DarkMode";
import { 
  signInWithGoogle, 
  signInWithFacebook, 
  signInWithEmailPassword, 
  signUpWithEmailPassword 
} from "@/services/authService";

const FirebaseLogin = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState({ login: false, signup: false });
  const [currentTab, setCurrentTab] = useState("login");
  const [loading, setLoading] = useState(false);

  const [firebaseAuth, { data: authData, error: authError, isLoading: authIsLoading }] = useFirebaseAuthMutation();
  const [firebaseSignup, { data: signupData, error: signupError, isLoading: signupIsLoading }] = useFirebaseSignupMutation();
  const [firebaseLogout] = useFirebaseLogoutMutation();
  
  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleEmailPasswordAuth = async (type) => {
    if (type === "signup") {
      // Validation
      if (!signupInput.name.trim()) {
        toast.error("Please enter your full name");
        return;
      }
      if (!signupInput.email.trim()) {
        toast.error("Please enter your email address");
        return;
      }
      if (!signupInput.password.trim()) {
        toast.error("Please create a password");
        return;
      }
      if (signupInput.password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      setLoading(true);
      const result = await signUpWithEmailPassword(
        signupInput.email,
        signupInput.password,
        signupInput.name
      );

      if (result.success) {
        // Send to backend
        await firebaseSignup({
          idToken: result.token,
          userData: {
            name: signupInput.name,
            email: signupInput.email
          }
        });
      } else {
        toast.error(result.error);
      }
      setLoading(false);

    } else {
      // Login validation
      if (!loginInput.email.trim()) {
        toast.error("Please enter your email address");
        return;
      }
      if (!loginInput.password.trim()) {
        toast.error("Please enter your password");
        return;
      }

      setLoading(true);
      const result = await signInWithEmailPassword(loginInput.email, loginInput.password);

      if (result.success) {
        // Send to backend
        await firebaseAuth({
          idToken: result.token
        });
      } else {
        toast.error(result.error);
      }
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    const result = await signInWithGoogle();

    if (result.success) {
      if (result.isNewUser) {
        // New user signup
        await firebaseSignup({
          idToken: result.token,
          userData: {
            name: result.user.displayName,
            email: result.user.email,
            photoUrl: result.user.photoURL
          }
        });
      } else {
        // Existing user login
        await firebaseAuth({
          idToken: result.token
        });
      }
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  };

  const handleFacebookAuth = async () => {
    setLoading(true);
    const result = await signInWithFacebook();

    if (result.success) {
      if (result.isNewUser) {
        // New user signup
        await firebaseSignup({
          idToken: result.token,
          userData: {
            name: result.user.displayName,
            email: result.user.email,
            photoUrl: result.user.photoURL
          }
        });
      } else {
        // Existing user login
        await firebaseAuth({
          idToken: result.token
        });
      }
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  };

  const togglePassword = (type) => {
    setShowPassword(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // Handle signup success
  useEffect(() => {
    if (signupData) {
      toast.success(signupData.message || "🎉 Account created successfully!", {
        description: "Welcome to SkillHive! You can now sign in to start learning.",
        duration: 4000,
      });
      
      // Clear signup form
      setSignupInput({
        name: "",
        email: "",
        password: "",
      });
      
      // Auto-redirect to login tab
      setTimeout(() => {
        setCurrentTab("login");
      }, 2000);
    }
  }, [signupData]);

  // Handle signup error
  useEffect(() => {
    if (signupError) {
      toast.error("❌ " + (signupError.data?.message || "Signup failed"), {
        description: "Please check your information and try again.",
        duration: 4000,
      });
    }
  }, [signupError]);

  // Handle auth success
  useEffect(() => {
    if (authData) {
      toast.success(authData.message || "🎊 Welcome back!", {
        description: "You have successfully signed in to SkillHive.",
        duration: 3000,
      });
      navigate("/");
    }
  }, [authData, navigate]);

  // Handle auth error
  useEffect(() => {
    if (authError) {
      toast.error("❌ " + (authError.data?.message || "Login failed"), {
        description: "Please check your information and try again.",
        duration: 4000,
      });
    }
  }, [authError]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 flex items-center gap-3">
              <BookOpen className="h-12 w-12" />
              SkillHive
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              Transform your career with world-class online learning
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="bg-white/20 p-4 rounded-2xl">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Join 50M+ Learners</h3>
                <p className="text-blue-100 text-lg">Learn from industry experts</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="bg-white/20 p-4 rounded-2xl">
                <Award className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Get Certified</h3>
                <p className="text-blue-100 text-lg">Earn certificates that matter</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="bg-white/20 p-4 rounded-2xl">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Advance Your Career</h3>
                <p className="text-blue-100 text-lg">Skills that get you hired</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="lg:hidden mb-8">
              <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
                <BookOpen className="h-8 w-8" />
                SkillHive
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome to SkillHive
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Start your learning journey today
            </p>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex justify-end">
            <DarkMode />
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleGoogleAuth}
              disabled={loading || authIsLoading || signupIsLoading}
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              variant="outline"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </Button>

            <Button
              onClick={handleFacebookAuth}
              disabled={loading || authIsLoading || signupIsLoading}
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              )}
              Continue with Facebook
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  type="email"
                  id="login-email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Enter your email"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword.login ? "text" : "password"}
                    id="login-password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="Enter your password"
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword("login")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword.login ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                onClick={() => handleEmailPasswordAuth("login")}
                disabled={loading || authIsLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading || authIsLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  type="text"
                  id="signup-name"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Enter your full name"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  type="email"
                  id="signup-email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Enter your email"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword.signup ? "text" : "password"}
                    id="signup-password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="Create a password (min. 6 characters)"
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword("signup")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword.signup ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                onClick={() => handleEmailPasswordAuth("signup")}
                disabled={loading || signupIsLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading || signupIsLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FirebaseLogin;
