
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published_at: string;
  featured_image: string;
  author: {
    username: string;
  };
}

const BLOG_CONTENTS: Record<string, BlogPost> = {
  "future-fraud-prevention-trends": {
    id: "5",
    title: "The Future of Fraud Prevention: Emerging Technologies and Trends",
    content: `
      <p>As we move further into the digital age, fraudsters are becoming increasingly sophisticated in their methods. However, emerging technologies are providing powerful new tools for fraud prevention. Let's explore the key trends and technologies that are shaping the future of fraud prevention.</p>

      <h2>1. Artificial Intelligence and Machine Learning</h2>
      <p>AI and ML are revolutionizing fraud detection by:</p>
      <ul>
        <li>Analyzing patterns across millions of transactions in real-time</li>
        <li>Adapting to new fraud patterns automatically</li>
        <li>Reducing false positives while increasing detection accuracy</li>
        <li>Predicting potential fraud before it occurs</li>
      </ul>

      <h2>2. Behavioral Biometrics</h2>
      <p>Beyond traditional authentication methods, behavioral biometrics analyze unique patterns in user behavior, such as:</p>
      <ul>
        <li>Typing rhythm and pressure</li>
        <li>Mouse movement patterns</li>
        <li>Device handling characteristics</li>
        <li>Navigation patterns</li>
      </ul>

      <h2>3. Blockchain Technology</h2>
      <p>Blockchain is emerging as a powerful tool for fraud prevention through:</p>
      <ul>
        <li>Immutable transaction records</li>
        <li>Decentralized verification processes</li>
        <li>Smart contracts for automated compliance</li>
        <li>Enhanced transparency in financial transactions</li>
      </ul>

      <h2>4. Advanced Authentication Methods</h2>
      <p>Multi-factor authentication is evolving with:</p>
      <ul>
        <li>Biometric authentication (fingerprint, facial recognition)</li>
        <li>Zero-knowledge proofs</li>
        <li>Continuous authentication systems</li>
        <li>Risk-based authentication protocols</li>
      </ul>

      <h2>5. Real-time Fraud Detection</h2>
      <p>The future of fraud prevention lies in real-time detection capabilities:</p>
      <ul>
        <li>Instant transaction analysis</li>
        <li>Automated response systems</li>
        <li>Cross-channel fraud detection</li>
        <li>Integrated security ecosystems</li>
      </ul>

      <h2>How Udene is Preparing for the Future</h2>
      <p>At Udene, we're already implementing many of these emerging technologies:</p>
      <ul>
        <li>Advanced AI models for pattern recognition</li>
        <li>Behavioral analysis systems</li>
        <li>Real-time monitoring and response</li>
        <li>Integrated security solutions</li>
      </ul>

      <h2>Preparing Your Business</h2>
      <p>To stay ahead of future fraud threats, businesses should:</p>
      <ol>
        <li>Invest in scalable fraud prevention solutions</li>
        <li>Implement multi-layered security approaches</li>
        <li>Train staff on emerging security threats</li>
        <li>Regularly update security protocols</li>
        <li>Partner with experienced security providers</li>
      </ol>

      <h2>Conclusion</h2>
      <p>The future of fraud prevention is rapidly evolving, and staying ahead requires a proactive approach to adopting new technologies and strategies. By understanding these trends and implementing appropriate solutions, businesses can better protect themselves against increasingly sophisticated fraud attempts.</p>

      <p>Contact Udene today to learn how we can help your business prepare for the future of fraud prevention with our cutting-edge security solutions.</p>
    `,
    published_at: "2024-02-19",
    featured_image: "/lovable-uploads/photo-1518770660439-4636190af475.jpeg",
    author: {
      username: "Udene Security Team"
    }
  }
};

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      // Return the specific blog content if it exists, otherwise return a default post
      return BLOG_CONTENTS[slug || ""] || {
        id: "1",
        title: "Blog post not found",
        content: "This blog post is under construction.",
        published_at: new Date().toISOString(),
        featured_image: "/lovable-uploads/photo-1487058792275-0ad4aaf24ca7.jpeg",
        author: {
          username: "Udene Team"
        }
      } as BlogPost;
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/blog')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Button>

      <article className="prose prose-lg max-w-none">
        {post?.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
        <div className="flex items-center text-muted-foreground mb-8">
          <span>By {post?.author?.username}</span>
          <span className="mx-2">•</span>
          <time>{format(new Date(post?.published_at || ''), 'MMMM d, yyyy')}</time>
        </div>
        <div 
          className="prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 
                     prose-p:text-gray-600 prose-p:leading-relaxed 
                     prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 
                     prose-li:text-gray-600 prose-ol:list-decimal prose-ol:pl-6"
          dangerouslySetInnerHTML={{ __html: post?.content || '' }} 
        />
      </article>
    </div>
  );
};
