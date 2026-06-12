import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AdPosition = 'top-banner' | 'sidebar' | 'between-cards';

export interface Advertisement {
  id: string;
  title: string;
  content: string;
  position: AdPosition;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
}

interface AdsStore {
  ads: Advertisement[];
  addAd: (ad: Advertisement) => void;
  updateAd: (id: string, updates: Partial<Advertisement>) => void;
  deleteAd: (id: string) => void;
  getAdsByPosition: (position: AdPosition) => Advertisement[];
  getActiveAds: () => Advertisement[];
  deactivateAd: (id: string) => void;
}

const mockAds: Advertisement[] = [];

export const useAdsStore = create<AdsStore>(
  persist(
    (set, get) => ({
      ads: mockAds,
      addAd: (ad) => set((state) => ({ ads: [...state.ads, ad] })),
      updateAd: (id, updates) => set((state) => ({ ads: state.ads.map((a) => (a.id === id ? { ...a, ...updates } : a)) })),
      deleteAd: (id) => set((state) => ({ ads: state.ads.filter((a) => a.id !== id) })),
      getAdsByPosition: (position) => get().ads.filter((a) => a.position === position && a.isActive),
      getActiveAds: () => get().ads.filter((a) => a.isActive),
      deactivateAd: (id) => set((state) => ({ ads: state.ads.map((a) => (a.id === id ? { ...a, isActive: false } : a)) })),
    }),
    { name: 'progshare-ads' }
  )
);
