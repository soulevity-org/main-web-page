import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Docs", href: "/docs" },
  { name: "About Us", href: "/about" },
  { name: "Updates", href: "/updates" },
  { name: "Discord", href: "https://discord.gg/x6qnnguCgj", isExternal: true },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle scroll events for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Set mounted to true after initial render for animations
    setMounted(true);
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.nav 
      className={`sticky top-0 z-50 w-full border-b border-border backdrop-blur transition-all duration-300 ${
        scrolled ? 'bg-background/95 shadow-sm supports-[backdrop-filter]:bg-background/60' : 'bg-transparent supports-[backdrop-filter]:bg-background/20'
      }`}
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
      variants={navbarVariants}
    >
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <motion.div 
          className="flex items-center space-x-2 sm:space-x-3"
          variants={itemVariants}
        >
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="/images/soulevity-logo.png" 
              alt="Soulevity Logo" 
              className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 transition-all duration-300" 
            />
            <span className="text-lg font-bold text-primary sm:text-xl md:text-xl">Soulevity</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="ml-auto hidden items-center space-x-3 md:flex md:space-x-4 lg:space-x-6">
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              {item.isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center px-1 py-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    location === item.href ? "text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:bg-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="ml-auto md:hidden">
            <Button variant="ghost" size="icon" className="focus:ring-primary">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mt-8 flex flex-col gap-6">
              {navigation.map((item) => (
                item.isExternal ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-base font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-base font-medium transition-colors hover:text-primary ${
                      location === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}

              <div className="mt-4 space-y-4">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
