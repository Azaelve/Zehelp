import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProjectCategory = 'web' | 'apk' | 'exe' | 'source' | 'other';

export interface ProjectFile {
  id: string;
  name: string;
  language: string;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  author: string;
  authorId: string;
  authorRole: string;
  authorAvatar: string;
  createdAt: string;
  updatedAt: string;
  downloads: number;
  rating: number;
  ratings: number;
  tags: string[];
  screenshots: string[];
  files: ProjectFile[];
  isPublic: boolean;
}

export interface Comment {
  id: string;
  projectId: string;
  author: string;
  authorId: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  rating?: number;
  replies: Comment[];
}

interface ProjectStore {
  projects: Project[];
  comments: Comment[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
  getProjectsByAuthor: (authorId: string) => Project[];
  addComment: (comment: Comment) => void;
  deleteComment: (projectId: string, commentId: string) => void;
  getProjectComments: (projectId: string) => Comment[];
  incrementDownloads: (projectId: string) => void;
  addRating: (projectId: string, rating: number) => void;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'React Dashboard UI Kit',
    description: 'Kit UI dashboard modern dibangun dengan React dan Tailwind CSS.',
    category: 'web',
    author: 'Alex Developer',
    authorId: 'user1',
    authorRole: 'vip',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    downloads: 1250,
    rating: 4.8,
    ratings: 156,
    tags: ['React', 'Dashboard', 'Tailwind'],
    screenshots: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'],
    files: [],
    isPublic: true,
  },
];

export const useProjectStore = create<ProjectStore>(
  persist(
    (set, get) => ({
      projects: mockProjects,
      comments: [],
      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, updates) => set((state) => ({ projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)) })),
      deleteProject: (id) => set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
      getProject: (id) => get().projects.find((p) => p.id === id),
      getProjectsByAuthor: (authorId) => get().projects.filter((p) => p.authorId === authorId),
      addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
      deleteComment: (projectId, commentId) => set((state) => ({ comments: state.comments.filter((c) => !(c.projectId === projectId && c.id === commentId)) })),
      getProjectComments: (projectId) => get().comments.filter((c) => c.projectId === projectId),
      incrementDownloads: (projectId) => set((state) => ({ projects: state.projects.map((p) => (p.id === projectId ? { ...p, downloads: p.downloads + 1 } : p)) })),
      addRating: (projectId, rating) => set((state) => ({ projects: state.projects.map((p) => { if (p.id === projectId) { const newRating = (p.rating * p.ratings + rating) / (p.ratings + 1); return { ...p, rating: newRating, ratings: p.ratings + 1 }; } return p; }) })),
    }),
    { name: 'progshare-projects' }
  )
);
