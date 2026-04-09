import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, RoleMatch } from '@/types/career';
import { calculateMatches } from '@/engine/matchingEngine';

interface UserProfileContextType {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
  matches: RoleMatch[];
  hasProfile: boolean;
}

const defaultProfile: UserProfile = {
  name: '', email: '',
  hardSkills: [], softSkills: [], languages: [],
  courses: [], education: [], experiences: [],
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(defaultProfile);

  const hasProfile = profile.name.trim().length > 0;
  const matches = hasProfile ? calculateMatches(profile) : [];

  const setProfile = (p: UserProfile) => setProfileState(p);
  const updateProfile = (partial: Partial<UserProfile>) =>
    setProfileState(prev => ({ ...prev, ...partial }));

  return (
    <UserProfileContext.Provider value={{ profile, setProfile, updateProfile, matches, hasProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const ctx = useContext(UserProfileContext);
  if (!ctx) throw new Error('useUserProfile must be used within UserProfileProvider');
  return ctx;
}
