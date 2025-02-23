import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { Home } from "lucide-react";
import { Button } from "@/components/shared/ui/Button";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  featured_image: string;
  meta_description: string;
}

export default function Blog() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      console.log("Fetching blog posts...");
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching blog posts:", error);
        throw error;
      }
      
      console.log("Fetched blog posts:", data);
      return data as BlogPost[];
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