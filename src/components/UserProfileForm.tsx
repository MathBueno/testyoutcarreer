import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/context/UserProfileContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TagInput from '@/components/TagInput';
import { Experience } from '@/types/career';
import { Plus, Trash2, Save, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const hardSkillSuggestions = [
  'React', 'TypeScript', 'JavaScript', 'Python', 'Node.js', 'SQL', 'CSS', 'HTML',
  'Docker', 'Kubernetes', 'AWS', 'Git', 'Figma', 'Photoshop', 'SEO', 'Google Analytics',
  'Machine Learning', 'TensorFlow', 'Pandas', 'Power BI', 'Excel', 'Scrum', 'Kanban',
  'API REST', 'CI/CD', 'Linux', 'Terraform', 'A/B Testing', 'Copywriting',
];
const softSkillSuggestions = [
  'Comunicação', 'Liderança', 'Trabalho em Equipe', 'Resolução de Problemas',
  'Pensamento Analítico', 'Criatividade', 'Empatia', 'Organização', 'Negociação',
  'Tomada de Decisão', 'Mentoria', 'Visão Estratégica', 'Atenção aos Detalhes',
];
const languageSuggestions = ['Inglês', 'Espanhol', 'Francês', 'Alemão', 'Mandarim', 'Japonês', 'Italiano'];

export default function UserProfileForm() {
  const { profile, updateProfile } = useUserProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [hardSkills, setHardSkills] = useState(profile.hardSkills);
  const [softSkills, setSoftSkills] = useState(profile.softSkills);
  const [languages, setLanguages] = useState(profile.languages);
  const [courses, setCourses] = useState(profile.courses);
  const [education, setEducation] = useState(profile.education);
  const [experiences, setExperiences] = useState<Experience[]>(profile.experiences);

  const addExperience = () =>
    setExperiences([...experiences, { id: crypto.randomUUID(), title: '', company: '', years: 0 }]);

  const updateExperience = (id: string, field: keyof Experience, value: string | number) =>
    setExperiences(experiences.map(e => (e.id === id ? { ...e, [field]: value } : e)));

  const removeExperience = (id: string) => setExperiences(experiences.filter(e => e.id !== id));

  const handleSave = () => {
    if (!name.trim()) {
      toast({ title: 'Nome é obrigatório', variant: 'destructive' });
      return;
    }
    updateProfile({ name, email, hardSkills, softSkills, languages, courses, education, experiences });
    toast({ title: 'Perfil salvo com sucesso!' });
  };

  const handleSaveAndView = () => {
    if (!name.trim()) {
      toast({ title: 'Nome é obrigatório', variant: 'destructive' });
      return;
    }
    updateProfile({ name, email, hardSkills, softSkills, languages, courses, education, experiences });
    toast({ title: 'Perfil salvo! Redirecionando...' });
    navigate('/dashboard');
  };

  const sectionClass = "space-y-4";

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={sectionClass}>
        <h2 className="text-xl font-heading font-semibold text-foreground">Dados Pessoais</h2>
        <Card className="p-6 gradient-card border-border">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome Completo *</label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" className="bg-muted border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="bg-muted border-border" />
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={sectionClass}>
        <h2 className="text-xl font-heading font-semibold text-foreground">Competências</h2>
        <Card className="p-6 gradient-card border-border space-y-6">
          <TagInput label="Hard Skills" tags={hardSkills} onChange={setHardSkills} placeholder="Ex: React, Python..." suggestions={hardSkillSuggestions} />
          <TagInput label="Soft Skills" tags={softSkills} onChange={setSoftSkills} placeholder="Ex: Liderança..." suggestions={softSkillSuggestions} />
          <TagInput label="Idiomas" tags={languages} onChange={setLanguages} placeholder="Ex: Inglês..." suggestions={languageSuggestions} />
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={sectionClass}>
        <h2 className="text-xl font-heading font-semibold text-foreground">Formação & Cursos</h2>
        <Card className="p-6 gradient-card border-border space-y-6">
          <TagInput label="Formação Acadêmica" tags={education} onChange={setEducation} placeholder="Ex: Ciência da Computação - USP" />
          <TagInput label="Cursos e Certificações" tags={courses} onChange={setCourses} placeholder="Ex: AWS Solutions Architect" />
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={sectionClass}>
        <h2 className="text-xl font-heading font-semibold text-foreground">Experiências Profissionais</h2>
        <Card className="p-6 gradient-card border-border space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="grid gap-3 md:grid-cols-4 items-end p-4 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Cargo</label>
                <Input value={exp.title} onChange={e => updateExperience(exp.id, 'title', e.target.value)} placeholder="Cargo" className="bg-muted border-border" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Empresa</label>
                <Input value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} placeholder="Empresa" className="bg-muted border-border" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Anos</label>
                <Input type="number" min={0} value={exp.years} onChange={e => updateExperience(exp.id, 'years', Number(e.target.value))} className="bg-muted border-border" />
              </div>
              <button onClick={() => removeExperience(exp.id)} className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addExperience} className="gap-2">
            <Plus className="h-4 w-4" /> Adicionar Experiência
          </Button>
        </Card>
      </motion.div>

      <div className="flex gap-3 justify-end pb-8">
        <Button onClick={handleSave} variant="outline" className="gap-2">
          <Save className="h-4 w-4" /> Salvar Perfil
        </Button>
        <Button onClick={handleSaveAndView} className="gap-2 gradient-accent text-primary-foreground hover:opacity-90">
          Ver Resultados <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
