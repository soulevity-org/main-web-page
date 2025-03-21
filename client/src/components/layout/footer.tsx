import { Link } from "wouter";
import { motion } from "framer-motion";
import FadeInSection from "@/components/fade-in-section";

export default function Footer() {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Updates", href: "/updates" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "Twitter", href: "https://twitter.com" },
        { name: "LinkedIn", href: "https://linkedin.com" },
        { name: "GitHub", href: "https://github.com" },
      ],
      isExternal: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <FadeInSection direction="up" threshold={0.1}>
      <footer className="w-full border-t bg-background">
        <div className="container px-4 py-12 sm:px-6 md:py-16">
          <motion.div 
            className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {footerSections.map((section, index) => (
              <motion.div key={section.title} className="flex flex-col gap-4" variants={itemVariants}>
                <h3 className="text-base font-semibold text-foreground sm:text-lg">{section.title}</h3>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {section.links.map((link) => 
                    section.isExternal ? (
                      <a 
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-primary sm:text-base"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        key={link.name}
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary sm:text-base"
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mx-auto mt-12 max-w-6xl border-t pt-8 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p>© {new Date().getFullYear()} Soulevity Learning. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <img src="/images/soulevity-logo.png" alt="Soulevity Logo" className="h-6 w-6" />
            </div>
          </motion.div>
        </div>
      </footer>
    </FadeInSection>
  );
}