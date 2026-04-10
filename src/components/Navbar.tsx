import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-accent">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">CareerAI</span>
        </Link>
        <span className="text-xs text-muted-foreground">Consultor de carreira com IA</span>
      </div>
    </nav>
  );
}
