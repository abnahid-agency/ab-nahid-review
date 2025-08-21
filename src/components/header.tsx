import { Wand2 } from 'lucide-react';
import Link from 'next/link';
import { Nav } from '@/components/nav';

export function Header() {
  return (
    <header className="py-4 px-6 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-primary" />
          <Link href="/">
            <h1 className="text-xl font-bold">Ab review</h1>
          </Link>
        </div>
        <Nav />
      </div>
    </header>
  );
}
