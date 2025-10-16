'use client';

import { useCallback, useEffect, useState } from 'react';
import { Copy, Wand2 } from 'lucide-react';
import { generateReview } from '@/ai/flows/generate-review';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const reviewTopics = [
    'Digital Marketing',
    'SEO',
    'Web Development',
    'WordPress Development',
    'Next.js Development',
    'MERN Stack Development',
    'Figma to Next.js',
];

export function GoogleReviewGenerator() {
  const [googleReview, setGoogleReview] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(reviewTopics[0]);
  const { toast } = useToast();

  const handleGenerateReview = useCallback(async (topic: string) => {
    setIsLoading(true);
    const startTime = Date.now();
    try {
      const result = await generateReview({ topic });
      if (result && result.review) {
        setGoogleReview(result.review);
      } else {
        throw new Error('Failed to generate Google review. The AI returned an empty response.');
      }

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);

      setTimeout(() => {
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
  }, [toast]);

  useEffect(() => {
    handleGenerateReview(selectedTopic);
  }, [selectedTopic, handleGenerateReview]);

  const handleCopyToClipboard = () => {
    if (!googleReview) return;
    navigator.clipboard.writeText(googleReview);
    toast({
      title: 'Copied!',
      description: 'The review has been copied to your clipboard.',
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-none shadow-none">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className='flex items-center gap-4'>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Wand2 className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                    <CardTitle className="text-2xl font-headline">Google Review Generator</CardTitle>
                    <CardDescription className="mt-1">
                    An authentic Google review, generated just for you.
                    </CardDescription>
                </div>
            </div>
            {googleReview && !isLoading && (
              <Button
                aria-label="Copy review text"
                variant="default"
                className="text-white bg-primary hover:bg-primary/90"
                onClick={handleCopyToClipboard}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
            <Select onValueChange={setSelectedTopic} defaultValue={selectedTopic}>
                <SelectTrigger className="w-full sm:w-[280px]">
                    <SelectValue placeholder="Select a review topic" />
                </SelectTrigger>
                <SelectContent>
                    {reviewTopics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                            {topic}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="relative">
            {isLoading ? (
                <div className="space-y-2.5 rounded-md border border-input p-4">
                <Skeleton className="h-5 w-full bg-muted" />
                <Skeleton className="h-5 w-[90%] bg-muted" />
                <Skeleton className="h-5 w-full bg-muted" />
                <Skeleton className="h-5 w-[70%] bg-muted" />
                </div>
            ) : (
                <Textarea
                placeholder="Your generated review will appear here..."
                value={googleReview}
                readOnly
                onClick={handleCopyToClipboard}
                className="min-h-[150px] text-base bg-secondary/30 cursor-pointer"
                rows={6}
                aria-label="Generated Google Review"
                />
            )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
