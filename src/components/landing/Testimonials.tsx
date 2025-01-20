import { Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "We were losing $50K monthly to trial abuse until we implemented Udene. Their behavioral analysis caught what our internal systems missed - users creating multiple accounts with virtual cards. Now our trial conversion rate has increased by 40%.",
      author: "Sarah Chen",
      role: "Head of Revenue Operations",
      company: "SaaSHub Technologies"
    },
    {
      quote: "The cross-platform tracking is a game-changer. We discovered users were exploiting our freemium model across different devices. Udene helped us save $300K in the first quarter by preventing these systematic abuses.",
      author: "Michael Rodriguez",
      role: "Product Security Lead",
      company: "StreamFlex"
    },
    {
      quote: "Our educational platform was being exploited through shared trial accounts. Udene's system not only stopped the abuse but provided insights that helped us design a better pricing model. Student sign-ups have increased 60% since implementation.",
      author: "Dr. Emily Watson",
      role: "COO",
      company: "EduTech Solutions"
    },
    {
      quote: "As a B2B software provider, we struggled with companies sharing single licenses across multiple teams. Udene's device fingerprinting helped us identify and prevent this abuse, leading to a 45% increase in enterprise subscriptions.",
      author: "James Foster",
      role: "VP of Sales",
      company: "CloudStack Enterprise"
    },
    {
      quote: "The real-time monitoring caught a sophisticated ring of users exploiting our referral program. Within weeks of implementing Udene, we prevented over $100K in fraudulent reward claims and strengthened our program integrity.",
      author: "Lisa Thompson",
      role: "Fraud Prevention Manager",
      company: "RewardsPro"
    },
    {
      quote: "Our gaming platform faced massive abuse from users creating multiple accounts for free items. Udene's behavioral analysis helped us identify patterns we never saw before. Account abuse dropped by 85% in just two months.",
      author: "David Park",
      role: "Gaming Operations Director",
      company: "GameVerse"
    }
  ];

  return (
    <section className="py-24 bg-black/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary/10 p-4 rounded-full border border-primary/20 transform transition-all duration-500 hover:scale-110 hover:bg-primary/20">
            <Quote className="w-10 h-10 text-primary animate-pulse" />
          </div>
          
          <h2 className="text-4xl font-bold mb-4">
            Real Results from{" "}
            <span className="text-primary">Real Customers</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            See how businesses like yours prevented system exploitation and protected their revenue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-xl backdrop-blur-lg border border-primary/20 hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute -top-4 left-8 bg-primary/10 p-2 rounded-full border border-primary/20">
                <Quote className="w-4 h-4 text-primary" />
              </div>
              
              <blockquote className="text-gray-300 mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="mt-4">
                <p className="font-semibold text-primary">{testimonial.author}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
                <p className="text-gray-500 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};