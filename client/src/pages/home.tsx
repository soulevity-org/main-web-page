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

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Expert-Led Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              Learn from industry professionals and gain practical skills through
              our comprehensive course catalog.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Vibrant Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              Connect with like-minded learners, share experiences, and grow
              together in our supportive community.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Latest Research
              </CardTitle>
            </CardHeader>
            <CardContent>
              Stay updated with cutting-edge research and developments in your
              field of interest.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-4 scroll-m-20 text-3xl font-bold tracking-tight">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of learners who are already transforming their
                careers with Soulevity.
              </p>
              <Button size="lg" className="mt-8">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
