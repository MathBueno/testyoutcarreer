import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ParsedProfile, BehavioralProfile, CareerAnalysis, InputMode } from '@/types/career';
import { supabase } from '@/integrations/supabase/client';

interface CareerContextType {
  // Input
  inputMode: InputMode;
  setInputMode: (m: InputMode) => void;
  inputText: string;
  setInputText: (t: string) => void;

  // Parsed profile
  parsedProfile: ParsedProfile | null;
  setParsedProfile: (p: ParsedProfile | null) => void;

  // Behavioral
  behavioralProfile: BehavioralProfile | null;
  setBehavioralProfile: (b: BehavioralProfile | null) => void;

  // Analysis result
  analysis: CareerAnalysis | null;
  setAnalysis: (a: CareerAnalysis | null) => void;

  // Loading states
  isParsing: boolean;
  isGenerating: boolean;

  // Actions
  parseProfile: (text: string, mode: InputMode) => Promise<ParsedProfile | null>;
  generateRoles: () => Promise<void>;
  reset: () => void;

  // Steps
  step: number;
  setStep: (s: number) => void;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export function CareerProvider({ children }: { children: ReactNode }) {
  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [inputText, setInputText] = useState('');
  const [parsedProfile, setParsedProfile] = useState<ParsedProfile | null>(null);
  const [behavioralProfile, setBehavioralProfile] = useState<BehavioralProfile | null>(null);
  const [analysis, setAnalysis] = useState<CareerAnalysis | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(0); // 0=input, 1=behavioral, 2=results

  const parseProfile = async (text: string, mode: InputMode): Promise<ParsedProfile | null> => {
    setIsParsing(true);
    try {
      const { data, error } = await supabase.functions.invoke('parse-profile', {
        body: { text, mode },
      });
      if (error) throw error;
      const profile = data as ParsedProfile;
      setParsedProfile(profile);
      return profile;
    } catch (e) {
      console.error('Parse error:', e);
      throw e;
    } finally {
      setIsParsing(false);
    }
  };

  const generateRoles = async () => {
    if (!parsedProfile) return;
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-roles', {
        body: { parsedProfile, behavioralProfile },
      });
      if (error) throw error;
      setAnalysis({
        parsedProfile,
        behavioralProfile: behavioralProfile || undefined,
        directions: data.directions || [],
        allRoles: (data.directions || []).flatMap((d: any) => d.roles || []),
        insights: data.insights || [],
      });
    } catch (e) {
      console.error('Generate roles error:', e);
      throw e;
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setInputText('');
    setParsedProfile(null);
    setBehavioralProfile(null);
    setAnalysis(null);
    setStep(0);
  };

  return (
    <CareerContext.Provider value={{
      inputMode, setInputMode, inputText, setInputText,
      parsedProfile, setParsedProfile,
      behavioralProfile, setBehavioralProfile,
      analysis, setAnalysis,
      isParsing, isGenerating,
      parseProfile, generateRoles, reset,
      step, setStep,
    }}>
      {children}
    </CareerContext.Provider>
  );
}

export function useCareer() {
  const ctx = useContext(CareerContext);
  if (!ctx) throw new Error('useCareer must be used within CareerProvider');
  return ctx;
}
