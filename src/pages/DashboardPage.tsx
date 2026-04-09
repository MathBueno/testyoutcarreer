import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUserProfile } from '@/context/UserProfileContext';
import { AreaFilter, SeniorityFilter } from '@/types/career';
import RecommendationList from '@/components/RecommendationList';
import CompatibilityChart from '@/components/CompatibilityChart';
import SkillsRadar from '@/components/SkillsRadar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Target, AlertCircle } from 'lucide-react';

const areas: { value: AreaFilter; label: string }[] = [
  { value: 'all', label: 'Todas as Áreas' },
  { value: 'tech', label: 'Tecnologia' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'management', label: 'Gestão' },
  { value: 'data', label: 'Dados' },
];

const seniorities: { value: SeniorityFilter; label: string }[] = [
  { value: 'all', label: 'Todos os Níveis' },
  { value: 'junior', label: 'Junior' },
  { value: 'pleno', label: 'Pleno' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
];

export default function DashboardPage() {
  const { profile, matches, hasProfile } = useUserProfile();
  const [areaFilter, setAreaFilter] = useState<AreaFilter>('all');
  const [seniorityFilter, setSeniorityFilter] = useState<SeniorityFilter>('all');

  if (!hasProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <Card className="p-12 gradient-card border-border text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Perfil não preenchido</h2>
          <p className="text-muted-foreground mb-6">
            Preencha seu perfil para receber recomendações de cargos.
          </p>
          <Link to="/profile">
            <Button className="gap-2 gradient-accent text-primary-foreground hover:opacity-90">
              Preencher Perfil <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const topMatch = matches[0];
  const totalSkills = profile.hardSkills.length + profile.softSkills.length;

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-6 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            Dashboard — {profile.name}
          </h1>
          <p className="text-muted-foreground">
            Análise de compatibilidade com {matches.length} cargos do mercado.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Skills Cadastradas', value: totalSkills, icon: Target },
            { label: 'Melhor Match', value: `${topMatch?.compatibilityPercent || 0}%`, icon: TrendingUp },
            { label: 'Idiomas', value: profile.languages.length, icon: Target },
            { label: 'Experiências', value: profile.experiences.length, icon: Target },
          ].map((stat, i) => (
            <Card key={stat.label} className="p-5 gradient-card border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15">
                  <stat.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <CompatibilityChart matches={matches} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <SkillsRadar matches={matches} />
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-4 items-center">
          <span className="text-sm font-medium text-foreground">Filtros:</span>
          <Select value={areaFilter} onValueChange={(v) => setAreaFilter(v as AreaFilter)}>
            <SelectTrigger className="w-48 bg-muted border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {areas.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={seniorityFilter} onValueChange={(v) => setSeniorityFilter(v as SeniorityFilter)}>
            <SelectTrigger className="w-48 bg-muted border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {seniorities.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="flex gap-2 ml-auto">
            <Badge variant="outline" className="border-border text-muted-foreground">
              {matches.filter(m => (areaFilter === 'all' || m.role.area === areaFilter) && (seniorityFilter === 'all' || m.role.seniority === seniorityFilter)).length} cargos
            </Badge>
          </div>
        </motion.div>

        {/* Recommendations */}
        <RecommendationList matches={matches} areaFilter={areaFilter} seniorityFilter={seniorityFilter} />
      </div>
    </div>
  );
}
