import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { RoleMatch } from '@/types/career';
import { Card } from '@/components/ui/card';

interface Props {
  matches: RoleMatch[];
}

export default function SkillsRadar({ matches }: Props) {
  // Aggregate missing skills across all roles
  const skillCounts: Record<string, number> = {};
  matches.forEach(m => {
    [...m.missingSkills, ...m.missingSoftSkills, ...m.missingLanguages].forEach(s => {
      skillCounts[s] = (skillCounts[s] || 0) + 1;
    });
  });

  const sorted = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const data = sorted.map(([name, count]) => ({ name, value: count }));

  const colors = [
    'hsl(186, 55%, 40%)', 'hsl(168, 60%, 55%)', 'hsl(207, 40%, 35%)',
    'hsl(195, 50%, 60%)', 'hsl(45, 80%, 55%)', 'hsl(25, 80%, 55%)',
  ];

  if (data.length === 0) return null;

  return (
    <Card className="p-6 gradient-card border-border">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Skills Mais Requisitadas</h3>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width="50%" height={200}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
              {data.map((_, i) => (
                <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(210, 45%, 10%)', border: '1px solid hsl(207, 30%, 18%)', borderRadius: 8, color: 'hsl(195, 30%, 90%)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
              <span className="text-foreground">{d.name}</span>
              <span className="text-muted-foreground ml-auto">({d.value}x)</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
