import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Shield, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

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

const RELATED_ARTICLES = [
  {
    id: "4",
    title: "Beyond the Lock: Multi-Layered Security Strategies",
    slug: "multi-layer-security-strategy",
    excerpt: "Understanding the importance of comprehensive security measures.",
    featured_image: "/lovable-uploads/photo-1487058792275-0ad4aaf24ca7.jpeg"
  },
  {
    id: "1",
    title: "Streamlining Fraud Detection with AI",
    slug: "ai-fraud-detection-revolution",
    excerpt: "How artificial intelligence is transforming fraud detection.",
    featured_image: "/lovable-uploads/photo-1487058792275-0ad4aaf24ca7.jpeg"
  },
  {
    id: "7",
    title: "Data Security Best Practices",
    slug: "data-security-best-practices",
    excerpt: "Essential security practices for your business.",
    featured_image: "/lovable-uploads/photo-1487058792275-0ad4aaf24ca7.jpeg"
  }
];

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
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
      {/* Navigation */}
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/blog')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8 prose prose-lg max-w-none">
          {/* Featured Image */}
          {post?.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />
          )}

          {/* Article Header */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <span>By {post?.author?.username}</span>
              <span className="mx-2">•</span>
              <time>{format(new Date(post?.published_at || ''), 'MMMM d, yyyy')}</time>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">In This Article:</h2>
            <ul className="list-none space-y-2">
              <li>
                <a href="#ai-ml" className="text-blue-600 hover:text-blue-800">
                  1. AI and Machine Learning
                </a>
              </li>
              <li>
                <a href="#behavioral-biometrics" className="text-blue-600 hover:text-blue-800">
                  2. Behavioral Biometrics
                </a>
              </li>
              <li>
                <a href="#blockchain" className="text-blue-600 hover:text-blue-800">
                  3. Blockchain Technology
                </a>
              </li>
              <li>
                <a href="#authentication" className="text-blue-600 hover:text-blue-800">
                  4. Advanced Authentication
                </a>
              </li>
              <li>
                <a href="#real-time" className="text-blue-600 hover:text-blue-800">
                  5. Real-time Detection
                </a>
              </li>
            </ul>
          </div>

          {/* Article Content */}
          <div 
            className="prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 
                       prose-p:text-gray-600 prose-p:leading-relaxed 
                       prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 
                       prose-li:text-gray-600 prose-ol:list-decimal prose-ol:pl-6"
            dangerouslySetInnerHTML={{ __html: post?.content || '' }} 
          />

          {/* CTA Sections */}
          <div className="my-12 space-y-6">
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Secure Your Business?</h3>
              <p className="text-gray-600 mb-6">Start your free trial today and experience enterprise-grade security.</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Shield className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Need More Information?</h3>
              <p className="text-gray-600 mb-6">Schedule a demo with our security experts.</p>
              <Button variant="outline">
                <ExternalLink className="mr-2 h-5 w-5" />
                Request Demo
              </Button>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Author Card */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">About the Author</h3>
            <p className="text-gray-600 mb-4">
              The Udene Security Team brings years of experience in cybersecurity and fraud prevention.
            </p>
            <Button variant="outline" className="w-full">
              View More Articles
            </Button>
          </Card>

          {/* Recommended Articles */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Recommended Reading</h3>
            <div className="space-y-4">
              {RELATED_ARTICLES.map((article) => (
                <Link to={`/blog/${article.slug}`} key={article.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={article.featured_image} 
                      alt={article.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-2">{article.title}</h4>
                      <p className="text-sm text-gray-600">{article.excerpt}</p>
                      <div className="flex items-center mt-2 text-blue-600">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Contact */}
          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Have Questions?</h3>
            <p className="text-gray-600 mb-4">Our security experts are here to help you implement the right fraud prevention strategy.</p>
            <Button className="w-full">Contact Us</Button>
          </Card>
        </aside>
      </div>
    </div>
  );
};
