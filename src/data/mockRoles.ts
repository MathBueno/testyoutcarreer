import { CareerRole } from '@/types/career';

export const mockRoles: CareerRole[] = [
  {
    id: '1', title: 'Desenvolvedor Frontend Senior', area: 'tech', seniority: 'senior',
    requiredHardSkills: ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript', 'Testes Unitários', 'Git'],
    requiredSoftSkills: ['Comunicação', 'Trabalho em Equipe', 'Resolução de Problemas'],
    requiredLanguages: ['Inglês'], requiredCourses: ['Arquitetura Frontend'], minExperienceYears: 5,
  },
  {
    id: '2', title: 'Desenvolvedor Backend Pleno', area: 'tech', seniority: 'pleno',
    requiredHardSkills: ['Node.js', 'Python', 'SQL', 'API REST', 'Docker', 'Git'],
    requiredSoftSkills: ['Pensamento Analítico', 'Organização'],
    requiredLanguages: ['Inglês'], requiredCourses: ['Microserviços'], minExperienceYears: 3,
  },
  {
    id: '3', title: 'UX/UI Designer Pleno', area: 'design', seniority: 'pleno',
    requiredHardSkills: ['Figma', 'Design System', 'Prototipagem', 'Pesquisa UX', 'Adobe XD'],
    requiredSoftSkills: ['Empatia', 'Comunicação', 'Criatividade'],
    requiredLanguages: ['Inglês'], requiredCourses: ['Design Thinking'], minExperienceYears: 3,
  },
  {
    id: '4', title: 'Analista de Marketing Digital', area: 'marketing', seniority: 'pleno',
    requiredHardSkills: ['SEO', 'Google Analytics', 'Google Ads', 'Copywriting', 'Social Media'],
    requiredSoftSkills: ['Comunicação', 'Criatividade', 'Pensamento Analítico'],
    requiredLanguages: ['Inglês', 'Espanhol'], requiredCourses: ['Marketing Digital'], minExperienceYears: 2,
  },
  {
    id: '5', title: 'Gerente de Projetos', area: 'management', seniority: 'senior',
    requiredHardSkills: ['Scrum', 'Kanban', 'MS Project', 'Gestão de Riscos', 'OKRs'],
    requiredSoftSkills: ['Liderança', 'Comunicação', 'Negociação', 'Tomada de Decisão'],
    requiredLanguages: ['Inglês', 'Espanhol'], requiredCourses: ['PMP', 'Scrum Master'], minExperienceYears: 5,
  },
  {
    id: '6', title: 'Cientista de Dados', area: 'data', seniority: 'senior',
    requiredHardSkills: ['Python', 'Machine Learning', 'SQL', 'Estatística', 'TensorFlow', 'Pandas'],
    requiredSoftSkills: ['Pensamento Analítico', 'Comunicação', 'Resolução de Problemas'],
    requiredLanguages: ['Inglês'], requiredCourses: ['Machine Learning', 'Deep Learning'], minExperienceYears: 4,
  },
  {
    id: '7', title: 'DevOps Engineer', area: 'tech', seniority: 'senior',
    requiredHardSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Linux', 'Git'],
    requiredSoftSkills: ['Resolução de Problemas', 'Organização', 'Trabalho em Equipe'],
    requiredLanguages: ['Inglês'], requiredCourses: ['AWS Solutions Architect'], minExperienceYears: 4,
  },
  {
    id: '8', title: 'Product Manager', area: 'management', seniority: 'senior',
    requiredHardSkills: ['Roadmap', 'OKRs', 'A/B Testing', 'SQL', 'Figma'],
    requiredSoftSkills: ['Liderança', 'Comunicação', 'Empatia', 'Negociação', 'Visão Estratégica'],
    requiredLanguages: ['Inglês'], requiredCourses: ['Product Management'], minExperienceYears: 5,
  },
  {
    id: '9', title: 'Analista de Dados Junior', area: 'data', seniority: 'junior',
    requiredHardSkills: ['SQL', 'Excel', 'Power BI', 'Python'],
    requiredSoftSkills: ['Pensamento Analítico', 'Organização'],
    requiredLanguages: ['Inglês'], requiredCourses: [], minExperienceYears: 1,
  },
  {
    id: '10', title: 'Designer Gráfico Junior', area: 'design', seniority: 'junior',
    requiredHardSkills: ['Photoshop', 'Illustrator', 'Canva', 'Tipografia'],
    requiredSoftSkills: ['Criatividade', 'Atenção aos Detalhes'],
    requiredLanguages: [], requiredCourses: ['Design Gráfico'], minExperienceYears: 1,
  },
  {
    id: '11', title: 'Tech Lead', area: 'tech', seniority: 'lead',
    requiredHardSkills: ['React', 'Node.js', 'TypeScript', 'Arquitetura de Software', 'Git', 'Docker', 'CI/CD'],
    requiredSoftSkills: ['Liderança', 'Comunicação', 'Mentoria', 'Tomada de Decisão'],
    requiredLanguages: ['Inglês'], requiredCourses: ['Arquitetura de Software'], minExperienceYears: 7,
  },
  {
    id: '12', title: 'Full Stack Developer Pleno', area: 'tech', seniority: 'pleno',
    requiredHardSkills: ['React', 'Node.js', 'TypeScript', 'SQL', 'API REST', 'Git'],
    requiredSoftSkills: ['Trabalho em Equipe', 'Resolução de Problemas'],
    requiredLanguages: ['Inglês'], requiredCourses: [], minExperienceYears: 3,
  },
];
