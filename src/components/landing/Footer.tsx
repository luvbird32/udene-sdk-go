import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Security", "Team", "Enterprise", "Customer Stories", "Pricing", "Resources"],
    },
    {
      title: "Platform",
      links: ["Developer API", "Partners", "Atom", "Electron", "GitHub Desktop"],
    },
    {
      title: "Support",
      links: ["Help", "Community Forum", "Professional Services", "Skills", "Status", "Contact GitHub"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Press", "Inclusion", "Social Impact", "Shop"],
    },
  ];

  const socialLinks = [
    { icon: Github, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
  ];

  return (
    <footer className="py-12 relative z-10 bg-black/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      to="#" 
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
              Connect
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-primary/20 pt-8">
          <p className="text-center text-gray-300">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};