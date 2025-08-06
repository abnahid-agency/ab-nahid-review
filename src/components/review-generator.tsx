'use client';

import { useState } from 'react';
import { Copy, Wand2 } from 'lucide-react';
import { generateReview } from '@/ai/flows/generate-review';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const keywordsList = [
    'best SEO expert in Sylhet',
    'best SEO expert in Bangladesh',
    'best web development agency in Sylhet',
    'best web developer in Sylhet',
    'top digital marketing agency in Sylhet',
    'affordable SEO services in Sylhet',
    'professional WordPress developer in Sylhet',
    'freelance SEO expert in Bangladesh',
    'custom website design in Sylhet',
    'SEO expert in Sylhet',
    'marketing agency in Sylhet',
    'SEO expert near me',
    'top WordPress development agency Sylhet',
];

function getRandomKeywords() {
  const shuffled = [...keywordsList].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
  return shuffled.slice(0, count).join(', ');
}

export function ReviewGenerator() {
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateReview = async () => {
    setIsLoading(true);
    setReview('');
    try {
      const keywords = getRandomKeywords();
      const result = await generateReview({ keywords });
      if (result && result.review) {
        setReview(result.review);
      } else {
        throw new Error('Failed to generate review. The AI returned an empty response.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while generating the review. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!review) return;
    navigator.clipboard.writeText(review);
    toast({
      title: 'Copied!',
      description: 'The review has been copied to your clipboard.',
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl bg-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Wand2 className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl font-headline">Ab Nahid Review Generator</CardTitle>
            <CardDescription className="mt-1">
              Generate a natural, human-sounding Google review for Ab Nahid Agency.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="relative">
            {isLoading ? (
              <div className="space-y-2.5 rounded-md border p-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-[90%]" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-[70%]" />
              </div>
            ) : (
              <Textarea
                placeholder="Your generated review will appear here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-[150px] text-base"
                rows={6}
                aria-label="Generated Review"
              />
            )}
             {review && !isLoading && (
              <Button
                aria-label="Copy review to clipboard"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:bg-accent/50"
                onClick={handleCopyToClipboard}
              >
                <Copy className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        <Button onClick={handleGenerateReview} disabled={isLoading} className="w-full font-bold" size="lg" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              Generate Review
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}