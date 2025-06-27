import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../config/firebase';

// Email/Password Authentication
export const signUpWithEmailPassword = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with display name
    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
    }
    
    return {
      success: true,
      user: userCredential.user,
      token: await userCredential.user.getIdToken()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

export const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user,
      token: await userCredential.user.getIdToken()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Google Authentication
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      success: true,
      user: result.user,
      token: await result.user.getIdToken(),
      isNewUser: result._tokenResponse?.isNewUser || false
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Facebook Authentication
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return {
      success: true,
      user: result.user,
      token: await result.user.getIdToken(),
      isNewUser: result._tokenResponse?.isNewUser || false
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Sign Out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Password Reset
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Get current user token
export const getCurrentUserToken = async () => {
  try {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    return null;
  } catch (error) {
    console.error('Error getting user token:', error);
    return null;
  }
};
