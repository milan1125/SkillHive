import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { userLoggedIn, userLoggedOut } from '@/features/authSlice';
import { useFirebaseAuthMutation } from '@/features/api/authApi';

const useAuthListener = () => {
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
    });

    return unsubscribe;
  }, [dispatch, firebaseAuth]);
};

export default useAuthListener;
