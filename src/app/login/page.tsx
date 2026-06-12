'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login berhasil!');
      router.push('/');
    } catch (error) {
      toast.error('Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold glow-text mb-2">ProgShare</h1>
          <p className="text-slate-400">Masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 border border-slate-800 rounded-lg p-6">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
            {loading ? 'Loading...' : 'Masuk'}
          </Button>
        </form>

        <p className="text-center text-slate-400">
          Belum punya akun? <Link href="/register" className="text-purple-400 hover:underline">Daftar</Link>
        </p>
      </div>
    </div>
  );
}
