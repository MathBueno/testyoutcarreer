import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

export default function TagInput({ label, tags, onChange, placeholder, suggestions = [] }: TagInputProps) {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.some(t => t.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...tags, trimmed]);
    }
    setValue('');
    setShowSuggestions(false);
  };

  const removeTag = (index: number) => onChange(tags.filter((_, i) => i !== index));

  const filtered = suggestions.filter(
    s => s.toLowerCase().includes(value.toLowerCase()) && !tags.some(t => t.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, i) => (
          <motion.div key={tag} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Badge variant="secondary" className="gap-1 bg-secondary text-secondary-foreground px-3 py-1">
              {tag}
              <button onClick={() => removeTag(i)} className="ml-1 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          </motion.div>
        ))}
      </div>
      <div className="relative">
        <div className="flex gap-2">
          <Input
            value={value}
            onChange={e => { setValue(e.target.value); setShowSuggestions(true); }}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(value); } }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            className="bg-muted border-border"
          />
          <button
            type="button"
            onClick={() => addTag(value)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {showSuggestions && value && filtered.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-card p-1 shadow-lg">
            {filtered.slice(0, 6).map(s => (
              <button
                key={s}
                onMouseDown={() => addTag(s)}
                className="w-full rounded-md px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
