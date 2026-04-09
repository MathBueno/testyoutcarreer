import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, BarChart3, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserProfile } from '@/context/UserProfileContext';

export default function Index() {
  const { hasProfile } = useUserProfile();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 gradient-ocean" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(186_55%_40%/0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm text-muted-foreground mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent" />
              Autoavaliação de carreira com IA
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-tight mb-6">
              Descubra seu{' '}
              <span className="text-gradient">potencial</span>
              <br />
              profissional
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
              Analise suas competências, identifique gaps e receba recomendações personalizadas de cargos compatíveis com seu perfil.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/profile">
                <Button size="lg" className="gap-2 gradient-accent text-primary-foreground hover:opacity-90 px-8 h-12 text-base">
                  {hasProfile ? 'Editar Perfil' : 'Começar Agora'} <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              {hasProfile && (
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="gap-2 h-12 text-base px-8">
                    Ver Dashboard <BarChart3 className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-heading font-bold text-center text-foreground mb-16"
          >
            Como funciona
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: User, title: 'Monte seu Perfil', desc: 'Cadastre suas hard/soft skills, idiomas, cursos e experiências profissionais.' },
              { icon: Target, title: 'Análise Inteligente', desc: 'A IA compara seu perfil com cargos do mercado e calcula a compatibilidade.' },
              { icon: BarChart3, title: 'Dashboard de Insights', desc: 'Visualize gaps, recomendações e seu progresso em gráficos interativos.' },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group rounded-2xl gradient-card border border-border p-8 hover:shadow-glow transition-shadow duration-300"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-accent">
                  <feat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{feat.title}</h3>
                <p className="text-muted-foreground">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
