import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCareer } from '@/context/CareerContext';
import { bigFiveQuestions, calculateBigFive } from '@/data/bigFiveQuestions';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, SkipForward, Brain } from 'lucide-react';

export default function BehavioralTest() {
  const { setBehavioralProfile, setStep } = useCareer();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState(0);

  const question = bigFiveQuestions[currentQ];
  const totalQ = bigFiveQuestions.length;
  const progress = Math.round(((currentQ + (answers[question?.id] ? 1 : 0)) / totalQ) * 100);
  const allAnswered = Object.keys(answers).length === totalQ;

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
    if (currentQ < totalQ - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 200);
    }
  };

  const handleFinish = () => {
    const result = calculateBigFive(answers);
    setBehavioralProfile(result);
    setStep(2);
  };

  const handleSkip = () => {
    setBehavioralProfile(null);
    setStep(2);
  };

  const scaleLabels = [
    'Discordo totalmente',
    'Discordo',
    'Neutro',
    'Concordo',
    'Concordo totalmente',
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-accent">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground">Perfil Comportamental</h2>
            <p className="text-sm text-muted-foreground">Teste rápido baseado no Big Five (opcional)</p>
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Pergunta {currentQ + 1} de {totalQ}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <Card className="gradient-card border-border p-8">
        <motion.div key={question.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <p className="text-lg font-medium text-foreground text-center">{question.text}</p>
          <div className="flex flex-col gap-2">
            {scaleLabels.map((label, i) => {
              const value = i + 1;
              const selected = answers[question.id] === value;
              return (
                <motion.button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                    selected
                      ? 'border-accent bg-accent/15 text-foreground'
                      : 'border-border bg-muted/30 text-muted-foreground hover:border-accent/30 hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                    selected ? 'border-accent bg-accent text-primary-foreground' : 'border-border'
                  }`}>
                    {value}
                  </div>
                  {label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Anterior
        </Button>

        <Button variant="ghost" onClick={handleSkip} className="gap-2 text-muted-foreground">
          <SkipForward className="h-4 w-4" /> Pular teste
        </Button>

        {allAnswered ? (
          <Button onClick={handleFinish} className="gap-2 gradient-accent text-primary-foreground hover:opacity-90">
            Ver Resultados <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => setCurrentQ(Math.min(totalQ - 1, currentQ + 1))}
            disabled={currentQ === totalQ - 1}
            className="gap-2"
          >
            Próxima <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
