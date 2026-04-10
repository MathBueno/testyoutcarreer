import { BigFiveQuestion } from '@/types/career';

export const bigFiveQuestions: BigFiveQuestion[] = [
  // Openness (O)
  { id: 'o1', text: 'Gosto de experimentar coisas novas e diferentes.', trait: 'openness', reversed: false },
  { id: 'o2', text: 'Prefiro rotina e previsibilidade no trabalho.', trait: 'openness', reversed: true },
  { id: 'o3', text: 'Tenho interesse em aprender sobre áreas fora da minha expertise.', trait: 'openness', reversed: false },

  // Conscientiousness (C)
  { id: 'c1', text: 'Sou muito organizado(a) e planejo minhas tarefas com antecedência.', trait: 'conscientiousness', reversed: false },
  { id: 'c2', text: 'Às vezes deixo tarefas para a última hora.', trait: 'conscientiousness', reversed: true },
  { id: 'c3', text: 'Presto muita atenção aos detalhes no meu trabalho.', trait: 'conscientiousness', reversed: false },

  // Extraversion (E)
  { id: 'e1', text: 'Me sinto energizado(a) ao trabalhar em equipe.', trait: 'extraversion', reversed: false },
  { id: 'e2', text: 'Prefiro trabalhar sozinho(a) na maior parte do tempo.', trait: 'extraversion', reversed: true },
  { id: 'e3', text: 'Gosto de liderar reuniões e apresentações.', trait: 'extraversion', reversed: false },

  // Agreeableness (A)
  { id: 'a1', text: 'Costumo priorizar a harmonia do grupo sobre minha opinião.', trait: 'agreeableness', reversed: false },
  { id: 'a2', text: 'Não tenho problema em confrontar colegas quando discordo.', trait: 'agreeableness', reversed: true },
  { id: 'a3', text: 'Sou naturalmente empático(a) com as dificuldades dos outros.', trait: 'agreeableness', reversed: false },

  // Neuroticism (N)
  { id: 'n1', text: 'Fico facilmente estressado(a) com prazos apertados.', trait: 'neuroticism', reversed: false },
  { id: 'n2', text: 'Mantenho a calma mesmo em situações de pressão.', trait: 'neuroticism', reversed: true },
  { id: 'n3', text: 'Costumo me preocupar com o resultado do meu trabalho.', trait: 'neuroticism', reversed: false },
];

export function calculateBigFive(answers: Record<string, number>) {
  const traits = { openness: [] as number[], conscientiousness: [] as number[], extraversion: [] as number[], agreeableness: [] as number[], neuroticism: [] as number[] };
  
  for (const q of bigFiveQuestions) {
    const val = answers[q.id];
    if (val === undefined) continue;
    traits[q.trait].push(q.reversed ? 6 - val : val);
  }

  const avg = (arr: number[]) => arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10 : 3;

  const result = {
    openness: avg(traits.openness),
    conscientiousness: avg(traits.conscientiousness),
    extraversion: avg(traits.extraversion),
    agreeableness: avg(traits.agreeableness),
    neuroticism: avg(traits.neuroticism),
    dominantTraits: [] as string[],
  };

  const traitLabels: Record<string, string> = {
    openness: 'Abertura a Experiências',
    conscientiousness: 'Conscienciosidade',
    extraversion: 'Extroversão',
    agreeableness: 'Amabilidade',
    neuroticism: 'Neuroticismo',
  };

  const sorted = Object.entries(result)
    .filter(([k]) => k !== 'dominantTraits')
    .sort(([, a], [, b]) => (b as number) - (a as number));

  result.dominantTraits = sorted.slice(0, 2).map(([k]) => traitLabels[k] || k);

  return result;
}
