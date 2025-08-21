import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { FacebookReviewGenerator } from '@/components/facebook-review-generator';

export default function FacebookPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        <FacebookReviewGenerator />
      </main>
      <Footer />
    </div>
  );
}
