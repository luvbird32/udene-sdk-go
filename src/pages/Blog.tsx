
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  featured_image: string;
  meta_description: string;
}

const BLOG_ARTICLES = [
  {
    id: "1",
    title: "Streamlining Fraud Detection: How AI is Revolutionizing Business Security",
    slug: "ai-fraud-detection-revolution",
    excerpt: "Discover how artificial intelligence is transforming the landscape of fraud detection and prevention in modern businesses.",
    published_at: "2024-02-23",
    featured_image: "/lovable-uploads/photo-1518770660439-4636190af475.jpeg",
    meta_description: "Learn about AI's role in modern fraud detection and how it's helping businesses stay secure."
  },
  {
    id: "2",
    title: "7-Day Free Trial: Experience Udene's Powerful Security Without Commitment",
    slug: "free-trial-security-solution",
    excerpt: "Try our enterprise-grade security solution risk-free. No credit card required. See how Udene can protect your business.",
    published_at: "2024-02-22",
    featured_image: "/lovable-uploads/photo-1485827404703-89b55fcc595e.jpeg",
    meta_description: "Start your free trial of Udene's security solution today."
  },
  {
    id: "3",
    title: "Case Study: How Udene Protected E-commerce Giant from Sophisticated Fraud Attempt",
    slug: "ecommerce-fraud-prevention-case-study",
    excerpt: "Read how our AI-powered system detected and prevented a complex fraud scheme, saving millions in potential losses.",
    published_at: "2024-02-21",
    featured_image: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpeg",
    meta_description: "Real-world case study of Udene's fraud prevention capabilities."
  },
  {
    id: "4",
    title: "Beyond the Lock: Multi-Layered Security Strategies for Modern Businesses",
    slug: "multi-layer-security-strategy",
    excerpt: "Understanding the importance of comprehensive security measures and how to implement them effectively.",
    published_at: "2024-02-20",
    featured_image: "/lovable-uploads/photo-1487058792275-0ad4aaf24ca7.jpeg",
    meta_description: "Learn about implementing multi-layered security strategies."
  },
  {
    id: "5",
    title: "The Future of Fraud Prevention: Emerging Technologies and Trends",
    slug: "future-fraud-prevention-trends",
    excerpt: "Explore upcoming trends in fraud prevention and how businesses can prepare for future security challenges.",
    published_at: "2024-02-19",
    featured_image: "/lovable-uploads/photo-1526374965328-7f61d4dc18c5.jpeg",
    meta_description: "Stay ahead of fraud prevention trends and emerging technologies."
  },
  {
    id: "6",
    title: "Udene's Integrations: Seamless Security for Your Existing Systems",
    slug: "security-system-integrations",
    excerpt: "Learn how Udene seamlessly integrates with your existing business systems for enhanced security.",
    published_at: "2024-02-18",
    featured_image: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpeg",
    meta_description: "Discover Udene's integration capabilities with existing systems."
  },
  {
    id: "7",
    title: "Data Security Best Practices: Protecting Your Business from Cyber Threats",
    slug: "data-security-best-practices",
    excerpt: "Essential security practices every business should implement to protect sensitive data.",
    published_at: "2024-02-17",
    featured_image: "/lovable-uploads/photo-1461749280684-dccba630e2f6.jpeg",
    meta_description: "Learn key data security best practices for your business."
  },
  {
    id: "8",
    title: "Real-World Examples of Fraud and How Udene Can Help",
    slug: "fraud-examples-prevention",
    excerpt: "Examining common fraud scenarios and how advanced security measures can prevent them.",
    published_at: "2024-02-16",
    featured_image: "/lovable-uploads/photo-1605810230434-7631ac76ec81.jpeg",
    meta_description: "Understanding real-world fraud scenarios and prevention methods."
  },
  {
    id: "9",
    title: "Choosing the Right Security Solution: A Guide for Small Businesses",
    slug: "security-solution-guide-smb",
    excerpt: "A comprehensive guide helping small businesses select the perfect security solution for their needs.",
    published_at: "2024-02-15",
    featured_image: "/lovable-uploads/photo-1519389950473-47ba0277781c.jpeg",
    meta_description: "Guide for small businesses choosing security solutions."
  },
  {
    id: "10",
    title: "The Cost of Inaction: Why Investing in Fraud Prevention is Crucial",
    slug: "investing-fraud-prevention-importance",
    excerpt: "Understanding the financial impact of fraud and why prevention is better than cure.",
    published_at: "2024-02-14",
    featured_image: "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpeg",
    meta_description: "Learn about the importance of investing in fraud prevention."
  }
];

export default function Blog() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      console.log("Fetching blog posts...");
      // For now, return our static BLOG_ARTICLES
      return BLOG_ARTICLES as BlogPost[];
    },
    retry: 1
  });

  if (error) {
    return <ErrorState error={error as Error} />;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Blog</h1>
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Return Home
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              {post.featured_image && (
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <time className="text-sm text-muted-foreground">
                  {format(new Date(post.published_at), 'MMMM d, yyyy')}
                </time>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
