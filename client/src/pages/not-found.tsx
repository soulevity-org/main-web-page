import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animated-text";
import SEOHead from "@/components/seo-head";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [location, setLocation] = useLocation();
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  useEffect(() => {
    // Check if there's a previous page in history
    setHasPreviousPage(window.history.length > 1);
  }, []);

  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.back();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <>
      <SEOHead 
        title="Page Not Found | Soulevity Learning" 
        description="The page you're looking for doesn't exist. Let's get you back on track."
      />
      <div className="container flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-16 text-center">
        <motion.div
          className="max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-8 flex justify-center"
            variants={itemVariants}
          >
            <svg
              className="h-40 w-40 text-muted-foreground/30 flex justify-center items-center"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="11" r="10" />
              <path d="M8 15l8-8M16 15l-8-8" />
            </svg>
          </motion.div>

          <motion.div variants={itemVariants}>
            <AnimatedText
              text="404 - Page Not Found"
              as="h1"
              className="mb-4 text-4xl font-extrabold tracking-tight "
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AnimatedText
              text="The page you're looking for doesn't exist or has been moved. Let's get you back on track."
              className="mb-8 text-muted-foreground"
              delay={2}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            {hasPreviousPage ? (
              <Button 
                size="lg" 
                className="flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                onClick={handleGoBack}
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            ) : (
              <Link href="/">
                <Button 
                  size="lg" 
                  className="flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                >
                  <Home className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            )}
            
            <Link href="/">
              <Button 
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-16"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Link href="/" className="inline-block">
              <img 
                src="/images/soulevity-logo.png" 
                alt="Soulevity Logo" 
                className="h-16 w-16 transition-transform duration-300 hover:scale-110" 
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
