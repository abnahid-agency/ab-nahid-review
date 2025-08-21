'use client';

import { useEffect, useState } from 'react';
import { Copy, Wand2 } from 'lucide-react';
import { generateReview } from '@/ai/flows/generate-review';
import { generateFacebookReview } from '@/ai/flows/generate-facebook-review';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    'best website design company in sylhet',
    'best web development company sylhet',
    'next.js expert in sylhet',
    'professional web developer sylhet',
    'affordable seo service in bangladesh',
    'top seo agency in bangladesh',
    'seo service for local business bd',
    'wordpress expert in sylhet',
    'best marn stack developer in sylhet',
];

function getRandomKeywords() {
  const shuffled = [...keywordsList].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
  return shuffled.slice(0, count).join(', ');
}

export function ReviewGenerator() {
  const [googleReview, setGoogleReview] = useState('');
  const [facebookReview, setFacebookReview] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('google');
  const { toast } = useToast();

  const handleGenerateReview = async (reviewType: string) => {
    setIsLoading(true);
    const startTime = Date.now();
    try {
      const keywords = getRandomKeywords();
      let result;

      if (reviewType === 'google') {
        result = await generateReview({ keywords });
        if (result && result.review) {
          setGoogleReview(result.review);
        } else {
            throw new Error('Failed to generate Google review. The AI returned an empty response.');
        }
      } else if (reviewType === 'facebook') {
        result = await generateFacebookReview({ keywords });
        if (result && result.review) {
          setFacebookReview(result.review);
        } else {
            throw new Error('Failed to generate Facebook review. The AI returned an empty response.');
        }
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
  };

  useEffect(() => {
    handleGenerateReview(activeTab);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, toast]);

  const handleCopyToClipboard = () => {
    const reviewToCopy = activeTab === 'google' ? googleReview : facebookReview;
    if (!reviewToCopy) return;
    navigator.clipboard.writeText(reviewToCopy);
    toast({
      title: 'Copied!',
      description: 'The review has been copied to your clipboard.',
    });
  };

  const currentReview = activeTab === 'google' ? googleReview : facebookReview;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-transparent border-none shadow-none">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className='flex items-center gap-4'>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Wand2 className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                    <CardTitle className="text-2xl font-headline">Ab Nahid Review Generator</CardTitle>
                    <CardDescription className="mt-1">
                    An authentic review, generated just for you.
                    </CardDescription>
                </div>
            </div>
            {currentReview && !isLoading && (
              <Button
                aria-label="Copy review to clipboard"
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
        <Tabs defaultValue="google" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="google">Google Review</TabsTrigger>
            <TabsTrigger value="facebook">Facebook Review</TabsTrigger>
          </TabsList>
          <TabsContent value="google" className="mt-6">
            <div className="space-y-2">
              <div className="relative">
                {isLoading && activeTab === 'google' ? (
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
          </TabsContent>
          <TabsContent value="facebook" className="mt-6">
             <div className="space-y-2">
              <div className="relative">
                {isLoading && activeTab === 'facebook' ? (
                  <div className="space-y-2.5 rounded-md border border-input p-4">
                    <Skeleton className="h-5 w-full bg-muted" />
                    <Skeleton className="h-5 w-[90%] bg-muted" />
                    <Skeleton className="h-5 w-full bg-muted" />
                    <Skeleton className="h-5 w-[70%] bg-muted" />
                  </div>
                ) : (
                  <Textarea
                    placeholder="Your generated review will appear here..."
                    value={facebookReview}
                    readOnly
                    onClick={handleCopyToClipboard}
                    className="min-h-[150px] text-base bg-secondary/30 cursor-pointer"
                    rows={6}
                    aria-label="Generated Facebook Review"
                  />
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
