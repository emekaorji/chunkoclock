import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { auth } from 'renderer/api/firebaseConfig';
import { AuthContextInterface } from 'renderer/types/contextType';

type AuthProviderProps = {
  children: JSX.Element;
};

const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(response.user);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser(response.user);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      const response = await getRedirectResult(auth);
      setUser(response?.user ?? null);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    });
  }, []);

  const providerValue = useMemo(
    () => ({ user, signUp, signIn, signInWithGoogle, signOut }),
    [user, signUp, signIn, signInWithGoogle, signOut]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
