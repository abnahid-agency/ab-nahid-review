import { Wand2 } from 'lucide-react';

export function Header() {
  return (
    <header className="py-4 px-6 border-b">
      <div className="container mx-auto">
        <div className="flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold">Ab review</h1>
        </div>
      </div>
    </header>
  );
}
