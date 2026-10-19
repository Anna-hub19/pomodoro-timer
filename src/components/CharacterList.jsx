import { Users } from 'lucide-react';
import { CharacterCard } from './CharacterCard';

export function CharacterList({ characters, selectedId, onSelect }) {
  return (
    <section className="mt-6 sm:mt-8 w-full min-w-0">
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Users size={18} className="text-purple-400" />
          <span>Escolha seu companheiro de foco</span>
        </div>
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