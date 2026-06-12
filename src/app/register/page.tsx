'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(email, username, password);
      toast.success('Pendaftaran berhasil!');
      router.push('/');
    } catch (error) {
      toast.error('Pendaftaran gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold glow-text mb-2">ProgShare</h1>
          <p className="text-slate-400">Daftar akun baru</p>
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
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            {loading ? 'Loading...' : 'Daftar'}
          </Button>
        </form>

        <p className="text-center text-slate-400">
          Sudah punya akun? <Link href="/login" className="text-purple-400 hover:underline">Masuk</Link>
        </p>
      </div>
    </div>
  );
}
