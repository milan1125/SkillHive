import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

const RouteErrorBoundary = () => {
  const error = useRouteError();
  
  const getErrorMessage = () => {
    if (error?.status === 404) {
      return {
        title: "Page Not Found",
        message: "The page you're looking for doesn't exist or has been moved.",
        icon: <AlertTriangle className="h-12 w-12 text-orange-500" />
      };
    }
    
    return {
      title: "Something went wrong",
      message: error?.message || "An unexpected error occurred while loading this page.",
      icon: <AlertTriangle className="h-12 w-12 text-red-500" />
    };
  };

  const { title, message, icon } = getErrorMessage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            {icon}
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            {message}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            
            <Button asChild className="flex items-center gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
          
          {error?.status && (
            <div className="text-sm text-gray-500 pt-4 border-t">
              Error Code: {error.status}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteErrorBoundary;
