'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'vip' | 'admin' | 'owner';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  bio: string;
  joinDate: string;
  role: UserRole;
  totalUploads: number;
  totalDownloads: number;
  isVIP: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  upgradeToVIP: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('progshare_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      username: email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      bio: 'Selamat datang di ProgShare!',
      joinDate: new Date().toISOString(),
      role: 'user',
      totalUploads: 0,
      totalDownloads: 0,
      isVIP: false,
    };
    setUser(newUser);
    localStorage.setItem('progshare_user', JSON.stringify(newUser));
  };

  const register = async (email: string, username: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      bio: 'Selamat datang di ProgShare!',
      joinDate: new Date().toISOString(),
      role: 'user',
      totalUploads: 0,
      totalDownloads: 0,
      isVIP: false,
    };
    setUser(newUser);
    localStorage.setItem('progshare_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('progshare_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem('progshare_user', JSON.stringify(updated));
    }
  };

  const upgradeToVIP = () => {
    if (user) {
      const updated: User = { ...user, isVIP: true, role: 'vip' };
      setUser(updated);
      localStorage.setItem('progshare_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateUser, upgradeToVIP }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth harus dalam AuthProvider');
  }
  return context;
}
