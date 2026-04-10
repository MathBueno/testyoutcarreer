// ── Profile (parsed by AI from free text / CV / LinkedIn) ──
export interface ParsedProfile {
  hardSkills: string[];
  softSkills: string[];
  languages: string[];
  experienceLevel: 'junior' | 'mid' | 'senior';
  courses: string[];
  education: string[];
  totalYearsExperience: number;
  careerTendencies: string[]; // analytical, creative, strategic, etc.
  profileType: 'generalist' | 'specialist';
  summary: string;
  inconsistencies: string[];
}

// ── Behavioral (Big Five) ──
export interface BehavioralProfile {
  openness: number;       // 1-5
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  dominantTraits: string[];
}

export interface BigFiveQuestion {
  id: string;
  text: string;
  trait: keyof Omit<BehavioralProfile, 'dominantTraits'>;
  reversed: boolean;
}

// ── AI-generated role ──
export interface GeneratedRole {
  id: string;
  title: string;
  area: string;
  seniority: 'junior' | 'mid' | 'senior' | 'lead';
  compatibilityPercent: number;
  presentSkills: string[];
  missingSkills: string[];
  suggestions: RoleSuggestion[];
  effortLevel: 'low' | 'medium' | 'high';
  estimatedTimeMonths: number;
  behavioralMatch?: number; // 0-100
  zone: 'comfort' | 'growth';
}

export interface RoleSuggestion {
  type: 'hard_skill' | 'soft_skill' | 'language' | 'course' | 'certification';
  description: string;
}

// ── Career direction grouping ──
export interface CareerDirection {
  name: string;
  description: string;
  roles: GeneratedRole[];
  overallCompatibility: number;
}

// ── Full analysis result ──
export interface CareerAnalysis {
  parsedProfile: ParsedProfile;
  behavioralProfile?: BehavioralProfile;
  directions: CareerDirection[];
  allRoles: GeneratedRole[];
  insights: string[];
}

// ── Input mode ──
export type InputMode = 'text' | 'linkedin' | 'cv';
