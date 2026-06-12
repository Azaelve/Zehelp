'use client';

import { useState } from 'react';
import { useProjectStore } from '@/lib/project-store';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search, Download, Star, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  const projects = useProjectStore((state) => state.projects);
  const { user, isAuthenticated } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl font-bold glow-text">Jelajahi Project</h1>
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <Input
                placeholder="Cari project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-800"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Tidak ada project. {!isAuthenticated && <Link href="/login" className="text-purple-400 hover:underline">Login</Link>} untuk upload project!</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <div className="group bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 transition cursor-pointer p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-purple-400 transition">{project.title}</h3>
                      <p className="text-sm text-slate-400">{project.description.split('\n')[0]}</p>
                    </div>
                    {project.authorRole === 'vip' && (
                      <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">VIP</span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Download size={16} /> {project.downloads}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" /> {project.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
