import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/animated-text";
import FadeInSection from "@/components/fade-in-section";

export default function HeroSection() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
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
    <div className="relative overflow-hidden bg-background pt-16 sm:pt-20 md:pt-24 lg:pt-32">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          animate={{
            x: [0, 10, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-8 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-3">
            <AnimatedText
              text="Transform Your Learning Journey with Soulevity"
              as="h1"
              className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
              highlightWords={["Soulevity"]}
              centered={true}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex justify-center mt-6 mb-4">
            <AnimatedText
              text="Discover expert-led courses, join vibrant communities, and stay updated with cutting-edge research in one place."
              className="text-lg text-muted-foreground sm:text-xl"
              delay={3}
              centered={true}
            />
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button 
              size="lg" 
              className="text-lg transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg transition-all duration-300 hover:bg-primary/10"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Social proof or stats section */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-2 gap-8 rounded-xl border bg-card p-6 shadow-sm sm:grid-cols-3 md:mt-24"
          >
            <div className="flex h-24 w-full flex-col items-center justify-center py-2">
              <span className="text-3xl font-bold text-primary">5000+</span>
              <span className="text-sm text-muted-foreground">Active Learners</span>
            </div>
            <div className="flex h-24 w-full flex-col items-center justify-center py-2">
              <span className="text-3xl font-bold text-primary">100+</span>
              <span className="text-sm text-muted-foreground">Expert Courses</span>
            </div>
            <div className="hidden h-24 w-full flex-col items-center justify-center py-2 sm:flex">
              <span className="text-3xl font-bold text-primary">95%</span>
              <span className="text-sm text-muted-foreground">Satisfaction Rate</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
