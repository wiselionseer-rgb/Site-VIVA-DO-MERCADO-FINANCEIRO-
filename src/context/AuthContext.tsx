import { createContext, useState, useEffect, ReactNode } from 'react';
import { getDoc, setDoc, doc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';

type User = {
  email: string;
  role: 'admin' | 'user';
};

export type UserData = {
  email: string;
  pass: string;
  phone?: string;
  name?: string;
  group?: 'sinais' | 'mentoria';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  users: UserData[];
  addUser: (email: string, pass: string, phone?: string, name?: string, group?: 'sinais' | 'mentoria') => Promise<void>;
  removeUser: (email: string) => Promise<void>;
  updateUserPassword: (email: string, newPass: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('@patreze:user');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      setUser(u);
      if (u.role === 'admin') {
        fetchStudents();
      }
    }
  }, []);

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentData = querySnapshot.docs.map(d => d.data() as UserData);
      setUsers(studentData);
    } catch (e) {
      console.error("Error fetching students:", e);
    }
  };

  const login = async (email: string, pass: string) => {
    email = email.toLowerCase().trim();
    // Admin check
    if (email === 'admin@patreze.com' && pass === 'admin123') {
      try {
        await signInWithEmailAndPassword(auth, email, pass);
      } catch (err: any) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          // Auto create admin first time
          try {
             await createUserWithEmailAndPassword(auth, email, pass);
          } catch(e) {
             console.error("Admin error", e);
             return false;
          }
        } else {
          console.error("Admin login error", err);
          return false;
        }
      }
      const u = { email, role: 'admin' as const };
      setUser(u);
      localStorage.setItem('@patreze:user', JSON.stringify(u));
      await fetchStudents();
      return true;
    }

    // Standard user check
    try {
      const docRef = doc(db, 'students', email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().pass === pass) {
        const u = { email, role: 'user' as const };
        setUser(u);
        localStorage.setItem('@patreze:user', JSON.stringify(u));
        return true;
      }
    } catch (e) {
      console.error("Error logging in student:", e);
    }

    return false;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUsers([]);
    localStorage.removeItem('@patreze:user');
  };

  const addUser = async (email: string, pass: string, phone?: string, name?: string, group?: 'sinais' | 'mentoria') => {
    email = email.toLowerCase().trim();
    const newUser = { email, pass, phone: phone || '', name: name || '', group: group || 'mentoria' };
    try {
      await setDoc(doc(db, 'students', email), newUser);
      await fetchStudents();
    } catch (e) {
      console.error("Error adding student:", e);
    }
  };

  const updateUserPassword = async (email: string, newPass: string) => {
    email = email.toLowerCase().trim();
    try {
      await setDoc(doc(db, 'students', email), { pass: newPass }, { merge: true });
      await fetchStudents();
    } catch (e) {
      console.error("Error updating password:", e);
    }
  };

  const removeUser = async (email: string) => {
    email = email.toLowerCase().trim();
    try {
      await deleteDoc(doc(db, 'students', email));
      await fetchStudents();
    } catch (e) {
      console.error("Error removing student:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, users, addUser, removeUser, updateUserPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

