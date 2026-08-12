import { Sparkles } from 'lucide-react';

export function FooterQuote() {
  return (
    <footer className="mt-8 flex items-center justify-center gap-2 text-purple-300/80 text-xs md:text-sm bg-purple-950/30 border border-purple-900/20 py-3 px-6 rounded-full w-max mx-auto">
      <Sparkles size={14} />
      <span>Disciplinar-se é a ponte entre metas e conquistas • Desenvolvido por beatriz.codes</span>
    </footer>
  );
}