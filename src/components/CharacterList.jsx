import { Users } from 'lucide-react';
import { CharacterCard } from './CharacterCard';

export function CharacterList({ characters, selectedId, onSelect }) {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Users size={18} className="text-purple-400" />
          <span>Escolha seu companheiro de foco</span>
        </div>
        <button className="text-xs text-slate-400 hover:text-white transition">Ver todos</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            isSelected={char.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}