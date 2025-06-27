import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { Toaster } from "./components/ui/sonner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut } from "./features/authSlice";
import { useFirebaseAuthMutation } from "./features/api/authApi";
import LoadingSpinner from "./components/LoadingSpinner";

const AuthStateListener = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [firebaseAuth] = useFirebaseAuthMutation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          const userData = {
            name: firebaseUser.displayName || 'User',
            email: firebaseUser.email,
            photoUrl: firebaseUser.photoURL
          };

          // Sync with backend
          const response = await firebaseAuth({
            idToken: token,
            userData
          });

          if (response.data?.success) {
            dispatch(userLoggedIn({ user: response.data.user }));
          }
        } catch (error) {
          console.error('Auto-login failed:', error);
          dispatch(userLoggedOut());
        }
      } else {
        dispatch(userLoggedOut());
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch, firebaseAuth]);

  return <>{loading ? <LoadingSpinner/> : <>{children}</>}</>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <AuthStateListener>
        <App />
        <Toaster />
      </AuthStateListener>
    </Provider>
  </StrictMode>
);
