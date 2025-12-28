import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL('https://ab-review-generator.app'),
  title: 'Ab Nahid Review Generator',
  description: 'Generate authentic Google and Facebook reviews for Ab Nahid Agency to boost your online presence.',
  openGraph: {
    title: 'Ab Nahid Review Generator',
    description: 'Generate authentic Google and Facebook reviews for Ab Nahid Agency.',
    url: 'https://ab-review-generator.app',
    siteName: 'Ab Nahid Review Generator',
    images: [
      {
        url: 'https://ab-review-generator.app/og-image.png', // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.ChatFlowConfig = {
                ownerId: "f48f77e9-50ce-4c28-b183-d17b94d6969c"
              };
            `,
          }}
        />
        <script src="https://preview--abchat.lovable.app/widget.js" async></script>
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
