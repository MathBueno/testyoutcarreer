export interface UserProfile {
  name: string;
  email: string;
  hardSkills: string[];
  softSkills: string[];
  languages: string[];
  courses: string[];
  education: string[];
  experiences: Experience[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  years: number;
}

export interface CareerRole {
  id: string;
  title: string;
  area: string;
  seniority: 'junior' | 'pleno' | 'senior' | 'lead';
  requiredHardSkills: string[];
  requiredSoftSkills: string[];
  requiredLanguages: string[];
  requiredCourses: string[];
  minExperienceYears: number;
}

export interface RoleMatch {
  role: CareerRole;
  compatibilityPercent: number;
  presentSkills: string[];
  missingSkills: string[];
  presentSoftSkills: string[];
  missingSoftSkills: string[];
  presentLanguages: string[];
  missingLanguages: string[];
  suggestions: Suggestion[];
}

export interface Suggestion {
  type: 'course' | 'skill' | 'language' | 'certification';
  description: string;
}

export type AreaFilter = 'all' | 'tech' | 'design' | 'marketing' | 'management' | 'data';
export type SeniorityFilter = 'all' | 'junior' | 'pleno' | 'senior' | 'lead';
