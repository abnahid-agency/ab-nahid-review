import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ReviewGenerator } from '@/components/review-generator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        <ReviewGenerator />
      </main>
      <Footer />
    </div>
  );
}
