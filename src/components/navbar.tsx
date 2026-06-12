'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Menu, X, Home, Upload, Zap, LogOut, User, Crown } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl glow-text">
            <span className="text-2xl">⚡</span>
            <span>ProgShare</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <Home size={18} /> Jelajahi
              </Button>
            </Link>
            {isAuthenticated && (
              <Link href="/upload">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Upload size={18} /> Upload
                </Button>
              </Link>
            )}
            <Link href="/pricing">
              <Button variant="ghost" className="flex items-center gap-2">
                <Crown size={18} /> Premium
              </Button>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.isVIP && <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">VIP</span>}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-10 h-10 rounded-full border-2 border-slate-700 overflow-hidden hover:border-slate-500 transition">
                      <img src={user?.avatar} alt={user?.username} className="w-full h-full" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-800">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(`/profile/${user?.id}`)}>
                      <User size={18} className="mr-2" />
                      Profil Saya
                    </DropdownMenuItem>
                    {user?.role === 'admin' || user?.role === 'owner' ? (
                      <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/admin')}>
                        <Zap size={18} className="mr-2" />
                        Admin
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem className="cursor-pointer text-red-400" onClick={logout}>
                      <LogOut size={18} className="mr-2" />
                      Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Masuk</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-purple-600 hover:bg-purple-700">Daftar</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            {mobileMenuOpen ? (
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            ) : (
              <button onClick={() => setMobileMenuOpen(true)}>
                <Menu size={24} />
              </button>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <Home size={18} className="mr-2" /> Jelajahi
              </Button>
            </Link>
            {isAuthenticated && (
              <Link href="/upload" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <Upload size={18} className="mr-2" /> Upload
                </Button>
              </Link>
            )}
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <Crown size={18} className="mr-2" /> Premium
              </Button>
            </Link>
            {!isAuthenticated && (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Masuk</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Daftar</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
