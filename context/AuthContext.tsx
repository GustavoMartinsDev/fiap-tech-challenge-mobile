import { auth } from '@/firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { createContext, ReactNode, useContext, useState } from 'react';
import { router } from 'expo-router';

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signUp: (credentials: AuthCredentials, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async ({ email, password }: AuthCredentials) => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    setUser(userCredentials.user);
    setIsAuthenticated(true);

    router.replace('/');
  };

  const signUp = async (
    { email, password }: AuthCredentials,
    displayName?: string
  ) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredentials.user, {
      displayName,
    });

    setUser(userCredentials.user);
    setIsAuthenticated(true);

    router.replace('/');
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setIsAuthenticated(false);

      router.replace('/');
    } catch (error) {
      console.error('Failed to logout ', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'context not found, useAuth must be wrapped by AuthProvider'
    );
  }

  return context;
};
