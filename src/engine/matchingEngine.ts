import { UserProfile, CareerRole, RoleMatch, Suggestion } from '@/types/career';
import { mockRoles } from '@/data/mockRoles';

function intersect(a: string[], b: string[]): string[] {
  const setB = new Set(b.map(s => s.toLowerCase()));
  return a.filter(s => setB.has(s.toLowerCase()));
}

function difference(required: string[], present: string[]): string[] {
  const setP = new Set(present.map(s => s.toLowerCase()));
  return required.filter(s => !setP.has(s.toLowerCase()));
}

export function calculateMatches(profile: UserProfile): RoleMatch[] {
  return mockRoles.map(role => {
    const presentHard = intersect(role.requiredHardSkills, profile.hardSkills);
    const missingHard = difference(role.requiredHardSkills, profile.hardSkills);
    const presentSoft = intersect(role.requiredSoftSkills, profile.softSkills);
    const missingSoft = difference(role.requiredSoftSkills, profile.softSkills);
    const presentLang = intersect(role.requiredLanguages, profile.languages);
    const missingLang = difference(role.requiredLanguages, profile.languages);

    const totalReqs = role.requiredHardSkills.length + role.requiredSoftSkills.length + role.requiredLanguages.length;
    const totalPresent = presentHard.length + presentSoft.length + presentLang.length;
    const compatibilityPercent = totalReqs === 0 ? 100 : Math.round((totalPresent / totalReqs) * 100);

    const suggestions: Suggestion[] = [
      ...missingHard.map(s => ({ type: 'skill' as const, description: `Desenvolver hard skill: ${s}` })),
      ...missingSoft.map(s => ({ type: 'skill' as const, description: `Desenvolver soft skill: ${s}` })),
      ...missingLang.map(s => ({ type: 'language' as const, description: `Aprender idioma: ${s}` })),
    ];

    return {
      role,
      compatibilityPercent,
      presentSkills: presentHard,
      missingSkills: missingHard,
      presentSoftSkills: presentSoft,
      missingSoftSkills: missingSoft,
      presentLanguages: presentLang,
      missingLanguages: missingLang,
      suggestions,
    };
  }).sort((a, b) => b.compatibilityPercent - a.compatibilityPercent);
}
