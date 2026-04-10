import { motion } from 'framer-motion';
import { useCareer } from '@/context/CareerContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Brain, Sparkles } from 'lucide-react';

export default function ProfileSummary() {
  const { parsedProfile, behavioralProfile } = useCareer();
  if (!parsedProfile) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <Card className="gradient-card border-border p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="font-heading font-bold text-foreground">Resumo do Perfil</h3>
        </div>
        <p className="text-sm text-muted-foreground">{parsedProfile.summary}</p>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <span className="text-xs text-muted-foreground">Nível de Experiência</span>
            <div className="mt-1">
              <Badge className="gradient-accent text-primary-foreground capitalize">{parsedProfile.experienceLevel}</Badge>
            </div>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Tipo de Perfil</span>
            <div className="mt-1">
              <Badge variant="outline" className="capitalize">{parsedProfile.profileType === 'generalist' ? 'Generalista' : 'Especialista'}</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Hard Skills</span>
          <div className="flex flex-wrap gap-1.5">
            {parsedProfile.hardSkills.map(s => (
              <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Soft Skills</span>
          <div className="flex flex-wrap gap-1.5">
            {parsedProfile.softSkills.map(s => (
              <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
            ))}
          </div>
        </div>

        {parsedProfile.languages.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Idiomas</span>
            <div className="flex flex-wrap gap-1.5">
              {parsedProfile.languages.map(l => (
                <Badge key={l} variant="outline" className="text-xs">{l}</Badge>
              ))}
            </div>
          </div>
        )}

        {parsedProfile.careerTendencies.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Tendências de Carreira</span>
            <div className="flex flex-wrap gap-1.5">
              {parsedProfile.careerTendencies.map(t => (
                <Badge key={t} className="bg-accent/15 text-accent border-0 text-xs capitalize">{t}</Badge>
              ))}
            </div>
          </div>
        )}

        {parsedProfile.inconsistencies.length > 0 && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-destructive">
              <AlertTriangle className="h-4 w-4" /> Inconsistências Detectadas
            </div>
            {parsedProfile.inconsistencies.map((inc, i) => (
              <p key={i} className="text-xs text-destructive/80">• {inc}</p>
            ))}
          </div>
        )}
      </Card>

      {behavioralProfile && (
        <Card className="gradient-card border-border p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-accent" />
            <h3 className="font-heading font-bold text-foreground text-sm">Perfil Comportamental</h3>
          </div>
          <div className="grid gap-2">
            {[
              { label: 'Abertura', value: behavioralProfile.openness },
              { label: 'Conscienciosidade', value: behavioralProfile.conscientiousness },
              { label: 'Extroversão', value: behavioralProfile.extraversion },
              { label: 'Amabilidade', value: behavioralProfile.agreeableness },
              { label: 'Neuroticismo', value: behavioralProfile.neuroticism },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-32 shrink-0">{t.label}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full gradient-accent" style={{ width: `${(t.value / 5) * 100}%` }} />
                </div>
                <span className="text-xs font-medium text-foreground w-8 text-right">{t.value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {behavioralProfile.dominantTraits.map(t => (
              <Badge key={t} className="bg-accent/15 text-accent border-0 text-xs">{t}</Badge>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
}
