'use client';

import { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const handleGenerateReview = async () => {
      setIsLoading(true);
      const startTime = Date.now();
      try {
        const keywords = getRandomKeywords();
        const result = await generateReview({ keywords });

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1500 - elapsedTime);

        setTimeout(() => {
          if (result && result.review) {
            setReview(result.review);
          } else {
            throw new Error('Failed to generate review. The AI returned an empty response.');
          }
          setIsLoading(false);
        }, remainingTime);

      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong while generating the review. Please try again.',
        });
        setIsLoading(false);
      }
    };

    handleGenerateReview();
  }, [toast]);

  const handleCopyToClipboard = () => {
    if (!review) return;
    navigator.clipboard.writeText(review);
    toast({
      title: 'Copied!',
      description: 'The review has been copied to your clipboard.',
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card border-none shadow-none">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className='flex items-center gap-4'>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Wand2 className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                    <CardTitle className="text-2xl font-headline">Ab Nahid Review Generator</CardTitle>
                    <CardDescription className="mt-1">
                    An authentic Google review, generated just for you.
                    </CardDescription>
                </div>
            </div>
            {review && !isLoading && (
              <Button
                aria-label="Copy review to clipboard"
                variant="default"
                className="text-white bg-primary hover:bg-primary/90"
                onClick={handleCopyToClipboard}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Text
              </Button>
            )}
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
                readOnly
                className="min-h-[150px] text-base bg-secondary/30"
                rows={6}
                aria-label="Generated Review"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
