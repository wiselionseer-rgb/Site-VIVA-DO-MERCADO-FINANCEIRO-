import { createContext, useState, useEffect, ReactNode } from 'react';

type User = {
  email: string;
  role: 'admin' | 'user';
};

export type UserData = {
  email: string;
  pass: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  users: UserData[];
  addUser: (email: string, pass: string, phone?: string) => void;
  removeUser: (email: string) => void;
  updateUserPassword: (email: string, newPass: string) => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('@patreze:user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedUsers = localStorage.getItem('@patreze:users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers([]);
    }
  }, []);

  const login = (email: string, pass: string) => {
    // Admin check
    if (email === 'admin@patreze.com' && pass === 'admin123') {
      const u = { email, role: 'admin' as const };
      setUser(u);
      localStorage.setItem('@patreze:user', JSON.stringify(u));
      return true;
    }

    // Standard user check
    const existing = users.find(u => u.email === email && u.pass === pass);
    if (existing) {
      const u = { email: existing.email, role: 'user' as const };
      setUser(u);
      localStorage.setItem('@patreze:user', JSON.stringify(u));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('@patreze:user');
  };

  const addUser = (email: string, pass: string, phone?: string) => {
    const newUsers = [...users, { email, pass, phone }];
    setUsers(newUsers);
    localStorage.setItem('@patreze:users', JSON.stringify(newUsers));
  };

  const updateUserPassword = (email: string, newPass: string) => {
    const newUsers = users.map(u => u.email === email ? { ...u, pass: newPass } : u);
    setUsers(newUsers);
    localStorage.setItem('@patreze:users', JSON.stringify(newUsers));
  };

  const removeUser = (email: string) => {
    const newUsers = users.filter(u => u.email !== email);
    setUsers(newUsers);
    localStorage.setItem('@patreze:users', JSON.stringify(newUsers));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, users, addUser, removeUser, updateUserPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
