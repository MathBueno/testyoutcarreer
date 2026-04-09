import { motion } from 'framer-motion';
import { RoleMatch } from '@/types/career';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Lightbulb, TrendingUp } from 'lucide-react';

interface Props {
  match: RoleMatch;
  index: number;
}

export default function RecommendationCard({ match, index }: Props) {
  const { role, compatibilityPercent, presentSkills, missingSkills, missingSoftSkills, missingLanguages, suggestions } = match;

  const getColor = (pct: number) => {
    if (pct >= 75) return 'text-accent';
    if (pct >= 50) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getBgColor = (pct: number) => {
    if (pct >= 75) return 'bg-accent/20';
    if (pct >= 50) return 'bg-yellow-400/20';
    return 'bg-orange-400/20';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="p-6 gradient-card border-border hover:shadow-glow transition-shadow duration-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">{role.title}</h3>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="text-xs capitalize border-border text-muted-foreground">{role.area}</Badge>
              <Badge variant="outline" className="text-xs capitalize border-border text-muted-foreground">{role.seniority}</Badge>
            </div>
          </div>
          <div className={`flex items-center gap-2 rounded-xl px-4 py-2 ${getBgColor(compatibilityPercent)}`}>
            <TrendingUp className={`h-4 w-4 ${getColor(compatibilityPercent)}`} />
            <span className={`text-2xl font-heading font-bold ${getColor(compatibilityPercent)}`}>
              {compatibilityPercent}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-muted mb-6 overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-accent"
            initial={{ width: 0 }}
            animate={{ width: `${compatibilityPercent}%` }}
            transition={{ duration: 1, delay: index * 0.08 + 0.3 }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {presentSkills.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-accent">
                <CheckCircle2 className="h-4 w-4" /> Skills Presentes
              </div>
              <div className="flex flex-wrap gap-1.5">
                {presentSkills.map(s => (
                  <Badge key={s} className="bg-accent/15 text-accent border-0 text-xs">{s}</Badge>
                ))}
              </div>
            </div>
          )}

          {(missingSkills.length > 0 || missingSoftSkills.length > 0 || missingLanguages.length > 0) && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-orange-400">
                <XCircle className="h-4 w-4" /> Gaps a Desenvolver
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[...missingSkills, ...missingSoftSkills, ...missingLanguages].map(s => (
                  <Badge key={s} variant="outline" className="text-xs border-orange-400/30 text-orange-400">{s}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {suggestions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
              <Lightbulb className="h-4 w-4" /> Sugestões de Desenvolvimento
            </div>
            <ul className="space-y-1">
              {suggestions.slice(0, 4).map((s, i) => (
                <li key={i} className="text-xs text-muted-foreground">• {s.description}</li>
              ))}
              {suggestions.length > 4 && (
                <li className="text-xs text-muted-foreground">+ {suggestions.length - 4} mais sugestões</li>
              )}
            </ul>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
