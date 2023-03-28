import { User } from 'firebase/auth';

export interface AuthContextInterface {
  user: User | null;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  signOut: () => void;
}
