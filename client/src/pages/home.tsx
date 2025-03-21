import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Lightbulb,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import PageTransition from "@/components/page-transition";
import AnimatedText from "@/components/animated-text";
import FadeInSection from "@/components/fade-in-section";
import SEOHead from "@/components/seo-head";

export default function Home() {
  return (
    <PageTransition>
      <SEOHead 
        title="Soulevity Learning - Transform Your Learning Journey" 
        description="Discover expert-led courses, join vibrant communities, and stay updated with cutting-edge research in one place."
      />
      
      <div className="flex flex-col">
        <HeroSection />

        {/* Features Section */}
        <section className="container px-4 sm:px-6 py-12 sm:py-16 md:py-24">
          <FadeInSection>
            <AnimatedText 
              text="Why Choose Soulevity Learning" 
              as="h2"
              className="mb-6 sm:mb-10 text-center text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl"
              highlightWords={["Soulevity"]}
              centered={true}
            />
          </FadeInSection>
          
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3">
            <FadeInSection delay={1} direction="up">
              <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Expert-Led Courses
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-20 sm:h-24 md:h-28 flex items-center text-sm sm:text-base">
                  Learn from industry professionals and gain practical skills through
                  our comprehensive course catalog.
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection delay={2} direction="up">
              <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Vibrant Community
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-20 sm:h-24 md:h-28 flex items-center text-sm sm:text-base">
                  Connect with like-minded learners, share experiences, and grow
                  together in our supportive community.
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection delay={3} direction="up">
              <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Latest Research
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-20 sm:h-24 md:h-28 flex items-center text-sm sm:text-base">
                  Stay updated with cutting-edge research and developments in your
                  field of interest.
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-muted/50">
          <div className="container py-16 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <FadeInSection direction="up">
                <div className="flex justify-center">
                  <GraduationCap className="h-12 w-12 text-primary" />
                </div>
                <AnimatedText
                  text="Ready to Start Your Learning Journey?"
                  as="h2"
                  className="mt-4 scroll-m-20 text-3xl font-bold tracking-tight"
                  centered={true}
                />
                <AnimatedText
                  text="Join thousands of learners who are already transforming their careers with Soulevity."
                  delay={2}
                  className="mt-4 text-lg text-muted-foreground"
                  highlightWords={["Soulevity"]}
                  centered={true}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="flex justify-center"
                >
                  <Button size="lg" className="mt-8 transition-all duration-300 hover:scale-105">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
