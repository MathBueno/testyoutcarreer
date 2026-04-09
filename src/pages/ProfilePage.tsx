import UserProfileForm from '@/components/UserProfileForm';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Meu Perfil</h1>
          <p className="text-muted-foreground mb-8">
            Preencha suas competências para receber recomendações personalizadas.
          </p>
        </motion.div>
        <UserProfileForm />
      </div>
    </div>
  );
}
