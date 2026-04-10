import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, BarChart3, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCareer } from '@/context/CareerContext';
import SmartInput from '@/components/SmartInput';
import BehavioralTest from '@/components/BehavioralTest';
import ResultsDashboard from '@/components/ResultsDashboard';

export default function Index() {
  const { step, setStep, parsedProfile } = useCareer();

  const steps = [
    { label: 'Perfil', icon: Target },
    { label: 'Comportamental', icon: Brain },
    { label: 'Resultados', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen">
      {step === 0 && !parsedProfile && (
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 gradient-ocean" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(186_55%_40%/0.12),transparent_60%)]" />
          <div className="relative mx-auto max-w-6xl px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm text-muted-foreground mb-6 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-accent" />
                Análise de carreira com IA
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground leading-tight mb-4">
                Descubra seu{' '}
                <span className="text-gradient">potencial</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
                Descreva sua experiência e a IA irá analisar seu perfil, gerar cargos compatíveis, identificar gaps e sugerir um plano de desenvolvimento.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Step indicator */}
      {(step > 0 || parsedProfile) && (
        <div className="mx-auto max-w-6xl px-6 pt-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  step === i ? 'gradient-accent text-primary-foreground' : step > i ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                }`}>
                  <s.icon className="h-3 w-3" />
                  {s.label}
                </div>
                {i < steps.length - 1 && <div className={`w-8 h-px ${step > i ? 'bg-accent' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <SmartInput />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="behavioral" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <BehavioralTest />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <ResultsDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Features section (only on initial view) */}
      {step === 0 && !parsedProfile && (
        <section className="py-16 border-t border-border">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { icon: Target, title: 'Análise Inteligente', desc: 'A IA extrai e estrutura suas competências automaticamente de texto livre, LinkedIn ou CV.' },
                { icon: Brain, title: 'Perfil Comportamental', desc: 'Teste rápido baseado no Big Five para combinar personalidade com cargos ideais.' },
                { icon: BarChart3, title: 'Cargos Dinâmicos', desc: 'Roles gerados pela IA, não de uma lista fixa. Cobertura de todas as indústrias e níveis.' },
              ].map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="rounded-2xl gradient-card border border-border p-6 hover:shadow-glow transition-shadow duration-300"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl gradient-accent">
                    <feat.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-1">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
