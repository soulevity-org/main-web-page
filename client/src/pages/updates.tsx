import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useState } from "react";

const updates = [
  // {
  //   title: "New Course Launch: Advanced Machine Learning",
  //   date: "March 5, 2024",
  //   type: "Courses",
  //   source: "https://courses.soulevity.org/machine-learning",
  //   description:
  //     "We're excited to announce our new advanced machine learning course, covering deep learning and neural networks.",
  // },
  {
    title: "Soulevity's home web app has been uploaded.",
    date: "March 21, 2025",
    type: "Platform",
    source: "https://soulevity.org/",
    description:
      "An MVP website has been uploaded on soulevity.org",
  },
  {
    title: "Sahara Compute - Soulevity's favourite Cloud Computing Services",
    date: "March 21, 2025",
    type: "Explore",
    source: "https://saharacompute.com/",
    description:
      "Sahara Compute stands out in the cloud computing industry by offering high-performance virtual machines, scalable object storage, and managed services, all backed by 24/7 expert support. Their enterprise-grade infrastructure ensures unmatched speed and reliability, making them a trusted partner for businesses and individuals alike. Experience next-generation cloud computing with Sahara Compute. Enjoy enterprise-grade performance, 24/7 expert support, and transparent pricing without hidden fees. Get started today and receive a matching deposit of up to $100!",
  },
  // {
  //   title: "Research Paper: AI in Education",
  //   date: "March 1, 2024",
  //   type: "Research",
  //   source: "https://research.soulevity.org/papers/ai-education",
  //   description:
  //     "New research paper published on the impact of AI in modern education systems.",
  // },
  // {
  //   title: "New Social Media Integration",
  //   date: "February 28, 2024",
  //   type: "Social",
  //   source: "https://soulevity.org/social",
  //   description:
  //     "Connect and share your learning progress directly to your social media accounts.",
  // },
];

const exploreContent = [
  {
    title: "Sahara Compute - Soulevity's favourite Cloud Computing Services",
    date: "March 21, 2025",
    type: "Explore",
    source: "https://saharacompute.com/",
    description:
      "Sahara Compute stands out in the cloud computing industry by offering high-performance virtual machines, scalable object storage, and managed services, all backed by 24/7 expert support. Their enterprise-grade infrastructure ensures unmatched speed and reliability, making them a trusted partner for businesses and individuals alike. Experience next-generation cloud computing with Sahara Compute. Enjoy enterprise-grade performance, 24/7 expert support, and transparent pricing without hidden fees. Get started today and receive a matching deposit of up to $100!",
  },
  // {
  //   title: "Future of Online Learning",
  //   date: "March 2, 2024",
  //   type: "Explore",
  //   source: "https://blog.soulevity.org/future-learning",
  //   description:
  //     "Latest trends and predictions about the evolution of online education platforms.",
  // },
];

const updateTypes = ["All", "Courses", "Platform", "Research", "Social", "Explore"];

export default function Updates() {
  const [selectedType, setSelectedType] = useState("All");

  const filteredContent = selectedType === "All" 
    ? updates 
    : selectedType === "Explore" 
      ? exploreContent
      : updates.filter(update => update.type === selectedType);

  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mx-auto max-w-3xl"
      >
        <Bell className="h-8 w-8 text-primary mb-4" />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Soulevity Updates
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Stay informed about the latest changes and announcements.
        </p>
      </motion.div>

      <div className="mt-12 flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
        {updateTypes.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            onClick={() => setSelectedType(type)}
            className="min-w-[120px]"
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="mt-8 space-y-8 max-w-4xl mx-auto">
        {filteredContent.map((update) => (
          <motion.div
            key={update.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-col items-center space-y-2">
                <CardTitle className="text-xl text-center">{update.title}</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {update.date}
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  {update.type}
                </span>
                {update.source && (
                  <a 
                    href={update.source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {update.source}
                  </a>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground flex justify-center">{update.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}