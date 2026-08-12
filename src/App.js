import { useState } from 'react';
import { CHARACTERS } from './data/characters';
import { useTimer } from './hooks/useTimer';
import { Header } from './components/Header';
import { TimerCard } from './components/TimerCard';
import { CharacterList } from './components/CharacterList';
import { FooterQuote } from './components/FooterQuote';

export default function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[0]);
  const timer = useTimer(selectedCharacter.times.focus);

  const handleSelectCharacter = (char) => {
    setSelectedCharacter(char);
    timer.resetTimer(char.times.focus);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex justify-center items-center">
      <div className="max-w-4xl w-full">
        <Header />
        <TimerCard character={selectedCharacter} timer={timer} />
        <CharacterList
          characters={CHARACTERS}
          selectedId={selectedCharacter.id}
          onSelect={handleSelectCharacter}
        />
        <FooterQuote />
      </div>
    </div>
  );
}
