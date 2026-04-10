import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCareer } from '@/context/CareerContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RoleCard from '@/components/RoleCard';
import ProfileSummary from '@/components/ProfileSummary';
import { Loader2, RotateCcw, TrendingUp, Target, Compass, Brain, Lightbulb, ChevronDown } from 'lucide-react';

export default function ResultsDashboard() {
  const { analysis, isGenerating, generateRoles, parsedProfile, reset } = useCareer();
  const [selectedDirection, setSelectedDirection] = useState<string | null>(null);
  const [showInsights, setShowInsights] = useState(true);

  useEffect(() => {
    if (!analysis && parsedProfile) {
      generateRoles().catch(console.error);
    }
  }, []);

  if (isGenerating || !analysis) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="h-10 w-10 text-accent animate-spin" />
        <p className="text-muted-foreground text-sm">A IA está analisando seu perfil e gerando recomendações...</p>
        <p className="text-xs text-muted-foreground">Isso pode levar alguns segundos</p>
      </div>
    );
  }

  const directions = analysis.directions;
  const filteredRoles = selectedDirection
    ? directions.find(d => d.name === selectedDirection)?.roles || []
    : analysis.allRoles;

  const comfortRoles = analysis.allRoles.filter(r => r.zone === 'comfort');
  const growthRoles = analysis.allRoles.filter(r => r.zone === 'growth');

  return (
    <div className="space-y-8">
      {/* Profile summary */}
      <ProfileSummary />

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Cargos Encontrados', value: analysis.allRoles.length, icon: Target },
          { label: 'Direções de Carreira', value: directions.length, icon: Compass },
          { label: 'Zona de Conforto', value: comfortRoles.length, icon: TrendingUp },
          { label: 'Zona de Crescimento', value: growthRoles.length, icon: Brain },
        ].map((stat) => (
          <Card key={stat.label} className="p-4 gradient-card border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15">
                <stat.icon className="h-4 w-4 text-accent" />
              </div>
              <div>
                <div className="text-xl font-heading font-bold text-foreground">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Insights */}
      {analysis.insights.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="gradient-card border-border p-5">
            <button onClick={() => setShowInsights(!showInsights)} className="flex items-center gap-2 w-full">
              <Lightbulb className="h-4 w-4 text-accent" />
              <span className="font-heading font-bold text-foreground text-sm">Insights da IA</span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground ml-auto transition-transform ${showInsights ? 'rotate-180' : ''}`} />
            </button>
            {showInsights && (
              <ul className="mt-3 space-y-2">
                {analysis.insights.map((insight, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span> {insight}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </motion.div>
      )}

      {/* Direction filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedDirection(null)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            !selectedDirection ? 'gradient-accent text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          Todos ({analysis.allRoles.length})
        </button>
        {directions.map(d => (
          <button
            key={d.name}
            onClick={() => setSelectedDirection(d.name === selectedDirection ? null : d.name)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedDirection === d.name ? 'gradient-accent text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {d.name} ({d.roles.length}) · {d.overallCompatibility}%
          </button>
        ))}
      </div>

      {/* Roles grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {filteredRoles.map((role, i) => (
          <RoleCard key={role.id || i} role={role} index={i} />
        ))}
      </div>

      {/* Reset */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" onClick={reset} className="gap-2">
          <RotateCcw className="h-4 w-4" /> Nova Análise
        </Button>
      </div>
    </div>
  );
}
