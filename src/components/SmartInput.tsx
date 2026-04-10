import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCareer } from '@/context/CareerContext';
import { InputMode } from '@/types/career';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Linkedin, MessageSquare, Upload, ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const modes: { value: InputMode; label: string; icon: typeof MessageSquare; desc: string }[] = [
  { value: 'text', label: 'Texto Livre', icon: MessageSquare, desc: 'Descreva sua experiência, habilidades e objetivos' },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, desc: 'Cole o conteúdo do seu perfil LinkedIn' },
  { value: 'cv', label: 'Currículo', icon: FileText, desc: 'Cole o texto do seu CV ou faça upload' },
];

export default function SmartInput() {
  const { inputMode, setInputMode, inputText, setInputText, parseProfile, isParsing, setStep } = useCareer();
  const { toast } = useToast();
  const [cvFile, setCvFile] = useState<File | null>(null);

  const placeholders: Record<InputMode, string> = {
    text: 'Ex: Sou desenvolvedor full-stack com 5 anos de experiência em React, Node.js e Python. Tenho liderança de equipes, inglês fluente, certificação AWS. Trabalhei em startups e empresas de médio porte na área de fintech...',
    linkedin: 'Cole aqui o conteúdo copiado do seu perfil LinkedIn (About, Experience, Skills, etc.)...',
    cv: 'Cole aqui o texto do seu currículo ou faça upload de um PDF abaixo...',
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type === 'text/plain') {
      const text = await file.text();
      setInputText(text);
      setCvFile(file);
    } else if (file.type === 'application/pdf') {
      toast({ title: 'PDF detectado', description: 'Por favor, copie e cole o texto do PDF no campo acima.' });
    } else {
      toast({ title: 'Formato não suportado', description: 'Use arquivos .txt ou cole o texto diretamente.', variant: 'destructive' });
    }
  };

  const handleAnalyze = async () => {
    if (inputText.trim().length < 10) {
      toast({ title: 'Texto muito curto', description: 'Descreva suas habilidades e experiências com mais detalhes.', variant: 'destructive' });
      return;
    }
    try {
      await parseProfile(inputText, inputMode);
      toast({ title: 'Perfil analisado com sucesso!' });
      setStep(1);
    } catch {
      toast({ title: 'Erro ao analisar perfil', description: 'Tente novamente em alguns instantes.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode selector */}
      <div className="grid gap-3 md:grid-cols-3">
        {modes.map((m) => (
          <motion.button
            key={m.value}
            onClick={() => setInputMode(m.value)}
            className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
              inputMode === m.value
                ? 'border-accent bg-accent/10 shadow-glow'
                : 'border-border gradient-card hover:border-accent/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              inputMode === m.value ? 'gradient-accent' : 'bg-muted'
            }`}>
              <m.icon className={`h-5 w-5 ${inputMode === m.value ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <div className="font-heading font-semibold text-foreground text-sm">{m.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{m.desc}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Text input */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="gradient-card border-border p-6 space-y-4">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={placeholders[inputMode]}
            className="min-h-[200px] bg-muted border-border resize-none text-sm leading-relaxed"
          />

          {inputMode === 'cv' && (
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent/50 hover:text-foreground transition-colors">
                <Upload className="h-4 w-4" />
                {cvFile ? cvFile.name : 'Upload .txt'}
                <input type="file" accept=".txt,.text" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {inputText.length} caracteres
            </span>
            <Button
              onClick={handleAnalyze}
              disabled={isParsing || inputText.trim().length < 10}
              className="gap-2 gradient-accent text-primary-foreground hover:opacity-90"
            >
              {isParsing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Analisando...
                </>
              ) : (
                <>
                  Analisar Perfil <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
