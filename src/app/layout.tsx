import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/navbar';
import { AuthProvider } from '@/lib/auth-context';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ProgShare - Platform Berbagi Project Developer',
  description: 'Bagikan project Anda, dapatkan feedback, dan kolaborasi dengan developer di seluruh dunia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} antialiased dark bg-slate-950 text-slate-50`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
