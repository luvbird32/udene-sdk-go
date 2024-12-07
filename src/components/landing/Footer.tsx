import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Security", href: "#security" },
      { name: "Enterprise", href: "#enterprise" },
      { name: "Pricing", href: "#pricing" },
    ],
    developers: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/docs/api" },
      { name: "Status", href: "/status" },
      { name: "SDKs", href: "/docs/sdks" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Security", href: "/security" },
      { name: "Compliance", href: "/compliance" },
    ],
  };

  return (
    <footer className="relative z-10 border-t border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-green-400 mr-2" />
              <span className="text-xl font-bold text-green-300">Udene</span>
            </Link>
            <p className="text-green-300/80 mb-4 max-w-sm">
              Enterprise-grade fraud detection powered by advanced AI algorithms and real-time monitoring
            </p>
          </div>
          
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-green-400 font-semibold mb-3 capitalize">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-green-300/80 hover:text-green-300 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-green-500/20 pt-8 mt-8 text-center md:flex md:justify-between md:text-left">
          <p className="text-green-300/80 mb-4 md:mb-0">
            © {currentYear} Udene. All rights reserved.
          </p>
          <div className="space-x-6">
            <a href="https://twitter.com/udene" className="text-green-300/80 hover:text-green-300 transition-colors">
              Twitter
            </a>
            <a href="https://linkedin.com/company/udene" className="text-green-300/80 hover:text-green-300 transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/udene" className="text-green-300/80 hover:text-green-300 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};