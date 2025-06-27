import React from 'react';
import useAuthListener from '@/hooks/useAuthListener';
import LoadingSpinner from './LoadingSpinner';

const AuthProvider = ({ children }) => {
  const loading = useAuthListener();

  if (loading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default AuthProvider;
