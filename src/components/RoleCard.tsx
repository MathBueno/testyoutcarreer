import { motion } from 'framer-motion';
import { GeneratedRole } from '@/types/career';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Zap, Target, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
  role: GeneratedRole;
  index: number;
}

export default function RoleCard({ role, index }: Props) {
  const [expanded, setExpanded] = useState(false);

  const getColor = (pct: number) => pct >= 75 ? 'text-accent' : pct >= 50 ? 'text-yellow-400' : 'text-orange-400';
  const getBg = (pct: number) => pct >= 75 ? 'bg-accent/15' : pct >= 50 ? 'bg-yellow-400/15' : 'bg-orange-400/15';
  const effortLabel = { low: 'Baixo', medium: 'Médio', high: 'Alto' };
  const effortColor = { low: 'text-accent', medium: 'text-yellow-400', high: 'text-orange-400' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="gradient-card border-border p-5 hover:shadow-glow transition-shadow duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-heading font-bold text-foreground text-sm">{role.title}</h3>
              <Badge variant="outline" className="text-[10px] capitalize">{role.zone === 'comfort' ? '🏠 Conforto' : '🚀 Crescimento'}</Badge>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="text-[10px]">{role.area}</Badge>
              <Badge variant="outline" className="text-[10px] capitalize">{role.seniority}</Badge>
            </div>
          </div>
          <div className={`flex items-center gap-1 rounded-lg px-2.5 py-1 ${getBg(role.compatibilityPercent)}`}>
            <TrendingUp className={`h-3.5 w-3.5 ${getColor(role.compatibilityPercent)}`} />
            <span className={`text-sm font-bold ${getColor(role.compatibilityPercent)}`}>{role.compatibilityPercent}%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full gradient-accent"
            initial={{ width: 0 }}
            animate={{ width: `${role.compatibilityPercent}%` }}
            transition={{ duration: 0.8, delay: index * 0.05 }}
          />
        </div>

        {/* Quick info */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Zap className={`h-3 w-3 ${effortColor[role.effortLevel]}`} />
            Esforço: {effortLabel[role.effortLevel]}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            ~{role.estimatedTimeMonths} meses
          </span>
          {role.behavioralMatch !== undefined && (
            <span className="flex items-center gap-1">
              <Brain className="h-3 w-3" />
              Fit comportamental: {role.behavioralMatch}%
            </span>
          )}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
        >
          {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          {expanded ? 'Menos detalhes' : 'Mais detalhes'}
        </button>

        {expanded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 space-y-3">
            {role.presentSkills.length > 0 && (
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Skills Presentes</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {role.presentSkills.map(s => (
                    <Badge key={s} className="bg-accent/10 text-accent border-0 text-[10px]">{s}</Badge>
                  ))}
                </div>
              </div>
            )}
            {role.missingSkills.length > 0 && (
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Skills Faltantes</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {role.missingSkills.map(s => (
                    <Badge key={s} variant="outline" className="text-[10px] border-orange-400/30 text-orange-400">{s}</Badge>
                  ))}
                </div>
              </div>
            )}
            {role.suggestions.length > 0 && (
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Sugestões</span>
                <ul className="mt-1 space-y-1">
                  {role.suggestions.slice(0, 5).map((s, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <Target className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                      {s.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
