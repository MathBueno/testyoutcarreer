import { RoleMatch, AreaFilter, SeniorityFilter } from '@/types/career';
import RecommendationCard from './RecommendationCard';

interface Props {
  matches: RoleMatch[];
  areaFilter: AreaFilter;
  seniorityFilter: SeniorityFilter;
}

export default function RecommendationList({ matches, areaFilter, seniorityFilter }: Props) {
  const filtered = matches.filter(m => {
    if (areaFilter !== 'all' && m.role.area !== areaFilter) return false;
    if (seniorityFilter !== 'all' && m.role.seniority !== seniorityFilter) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Nenhum cargo encontrado com os filtros selecionados.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {filtered.map((m, i) => (
        <RecommendationCard key={m.role.id} match={m} index={i} />
      ))}
    </div>
  );
}
