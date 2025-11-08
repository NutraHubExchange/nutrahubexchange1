import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: UserRole, companyName: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: 'buyer-1',
    email: 'buyer@example.com',
    name: 'John Buyer',
    role: 'buyer',
    companyName: 'Health Foods Inc',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'supplier-1',
    email: 'supplier@example.com',
    name: 'Jane Supplier',
    role: 'supplier',
    companyName: 'NutriSource Ltd',
    createdAt: '2024-02-20T10:00:00Z',
  },
  {
    id: 'admin-1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    companyName: 'Platform Admin',
    createdAt: '2024-01-01T10:00:00Z',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (email: string, password: string, role: UserRole, companyName: string, name: string) => {
    // Mock signup
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: `${role}-${Date.now()}`,
      email,
      name,
      role,
      companyName,
      createdAt: new Date().toISOString(),
    };
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
