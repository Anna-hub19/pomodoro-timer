import { Check } from 'lucide-react';

export function CharacterCard({ character, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(character)}
      className={`relative cursor-pointer rounded-2xl border p-4 transition-all overflow-hidden flex flex-col justify-between h-48 bg-cover bg-center ${
        isSelected
          ? 'border-purple-500 ring-2 ring-purple-500/50 shadow-lg'
          : 'border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
      }`}
      style={{ backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.3)), url(${character.image})` }}
    >
      {/* Check de selecionado */}
      {isSelected && (
        <div className="absolute top-3 right-3 bg-purple-500 rounded-full p-1 text-white">
          <Check size={14} />
        </div>
      )}

      <div>
        <h3 className="font-bold text-white">{character.name}</h3>
        <p className="text-xs text-slate-400">{character.anime}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {character.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}