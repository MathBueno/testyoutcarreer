import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RoleMatch } from '@/types/career';
import { Card } from '@/components/ui/card';

interface Props {
  matches: RoleMatch[];
}

export default function CompatibilityChart({ matches }: Props) {
  const data = matches.slice(0, 8).map(m => ({
    name: m.role.title.length > 20 ? m.role.title.slice(0, 18) + '…' : m.role.title,
    compatibility: m.compatibilityPercent,
  }));

  const getColor = (pct: number) => {
    if (pct >= 75) return 'hsl(168, 60%, 55%)';
    if (pct >= 50) return 'hsl(45, 80%, 55%)';
    return 'hsl(25, 80%, 55%)';
  };

  return (
    <Card className="p-6 gradient-card border-border">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Compatibilidade por Cargo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
          <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(200, 15%, 55%)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" width={150} tick={{ fill: 'hsl(195, 30%, 90%)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: 'hsl(210, 45%, 10%)', border: '1px solid hsl(207, 30%, 18%)', borderRadius: 8, color: 'hsl(195, 30%, 90%)' }}
            formatter={(value: number) => [`${value}%`, 'Compatibilidade']}
          />
          <Bar dataKey="compatibility" radius={[0, 6, 6, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.compatibility)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
