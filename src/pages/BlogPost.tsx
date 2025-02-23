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
            <div className="relative h-[500px] mb-12 rounded-xl overflow-hidden shadow-2xl">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-5xl font-bold mb-4 leading-tight">{post?.title}</h1>
                <div className="flex items-center text-white/90">
                  <span>By {post?.author?.username}</span>
                  <span className="mx-2">•</span>
                  <time>{format(new Date(post?.published_at || ''), 'MMMM d, yyyy')}</time>
                </div>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-8 rounded-xl mb-12 border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">In This Article</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="#ai-ml" className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600 font-semibold">1</div>
                <span className="text-blue-900 font-medium">AI and Machine Learning</span>
              </a>
              <a href="#behavioral-biometrics" className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600 font-semibold">2</div>
                <span className="text-blue-900 font-medium">Behavioral Biometrics</span>
              </a>
              <a href="#blockchain" className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600 font-semibold">3</div>
                <span className="text-blue-900 font-medium">Blockchain Technology</span>
              </a>
              <a href="#authentication" className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600 font-semibold">4</div>
                <span className="text-blue-900 font-medium">Advanced Authentication</span>
              </a>
              <a href="#real-time" className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow md:col-span-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600 font-semibold">5</div>
                <span className="text-blue-900 font-medium">Real-time Detection</span>
              </a>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 
                       prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-700
                       prose-ul:list-none prose-ul:pl-0 prose-ul:my-6 
                       prose-li:text-gray-700 prose-li:mb-3 prose-li:pl-8 prose-li:relative
                       before:prose-li:content-['•'] before:prose-li:text-blue-500 before:prose-li:absolute before:prose-li:left-0 before:prose-li:top-0
                       prose-ol:list-none prose-ol:pl-0 prose-ol:counter-reset-[item]
                       [&_ol_li]:pl-10 [&_ol_li]:relative [&_ol_li]:counter-increment-[item]
                       before:[&_ol_li]:content-[counter(item)] before:[&_ol_li]:absolute before:[&_ol_li]:left-0 before:[&_ol_li]:top-0
                       before:[&_ol_li]:flex before:[&_ol_li]:items-center before:[&_ol_li]:justify-center
                       before:[&_ol_li]:w-6 before:[&_ol_li]:h-6 before:[&_ol_li]:bg-blue-100
                       before:[&_ol_li]:rounded-full before:[&_ol_li]:text-blue-600 before:[&_ol_li]:text-sm before:[&_ol_li]:font-semibold"
            dangerouslySetInnerHTML={{ __html: post?.content || '' }} 
          />

          {/* CTA Sections */}
          <div className="my-16 space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-12 rounded-2xl text-center text-white shadow-xl">
              <h3 className="text-3xl font-bold mb-4">Ready to Secure Your Business?</h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Start your free trial today and experience enterprise-grade security with our cutting-edge fraud prevention system.</p>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto">
                <Shield className="mr-3 h-6 w-6" />
                Start Free Trial
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h3 className="text-2xl font-bold mb-4">Need More Information?</h3>
                <p className="text-gray-600 mb-6">Schedule a personalized demo with our security experts.</p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Request Demo
                </Button>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
                <p className="text-gray-600 mb-6">Our security experts are here to help you find the right solution.</p>
                <Button variant="outline" className="w-full">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Author Card */}
          <Card className="p-8 bg-gradient-to-br from-gray-50 to-gray-100">
            <h3 className="text-xl font-bold mb-4">About the Author</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The Udene Security Team brings years of experience in cybersecurity and fraud prevention. Our experts continuously research and develop cutting-edge solutions to protect businesses worldwide.
            </p>
            <Button variant="outline" className="w-full">
              View More Articles
            </Button>
          </Card>

          {/* Recommended Articles */}
          <div>
            <h3 className="text-xl font-bold mb-6">Recommended Reading</h3>
            <div className="space-y-6">
              {RELATED_ARTICLES.map((article) => (
                <Link to={`/blog/${article.slug}`} key={article.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100">
                    <img 
                      src={article.featured_image} 
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-bold text-lg mb-3 text-gray-900">{article.title}</h4>
                      <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center text-blue-600 font-medium">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
