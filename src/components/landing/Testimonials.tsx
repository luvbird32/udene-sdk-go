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
    }
  ];

  return (
    <section className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-400 mb-4">
            Real Results from Real Customers
          </h2>
          <p className="text-xl text-green-300/80 max-w-3xl mx-auto">
            See how businesses like yours prevented system exploitation and protected their revenue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-xl backdrop-blur-lg border border-green-500/20 relative"
            >
              <div className="absolute -top-4 left-8 bg-green-500/10 p-2 rounded-full border border-green-400/20">
                <Quote className="w-4 h-4 text-green-400" />
              </div>
              
              <blockquote className="text-green-300/90 mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="mt-4">
                <p className="font-semibold text-green-400">{testimonial.author}</p>
                <p className="text-green-300/70 text-sm">{testimonial.role}</p>
                <p className="text-green-300/50 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};