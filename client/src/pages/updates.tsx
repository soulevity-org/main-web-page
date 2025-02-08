import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useState } from "react";

const updates = [
  {
    title: "New Course Launch: Advanced Machine Learning",
    date: "March 5, 2024",
    type: "Course Update",
    description:
      "We're excited to announce our new advanced machine learning course, covering deep learning and neural networks.",
  },
  {
    title: "Community Feature Updates",
    date: "March 3, 2024",
    type: "Platform Update",
    description:
      "New community features have been added, including improved discussion boards and real-time chat.",
  },
  {
    title: "Research Paper: AI in Education",
    date: "March 1, 2024",
    type: "Research Update",
    description:
      "New research paper published on the impact of AI in modern education systems.",
  },
  {
    title: "New Social Media Integration",
    date: "February 28, 2024",
    type: "Social Media Update",
    description:
      "Connect and share your learning progress directly to your social media accounts.",
  },
];

const updateTypes = ["All", "Course Update", "Platform Update", "Research Update", "Social Media Update"];

export default function Updates() {
  const [selectedType, setSelectedType] = useState("All");

  const filteredUpdates = updates.filter(
    (update) => selectedType === "All" || update.type === selectedType
  );

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
        {filteredUpdates.map((update) => (
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
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{update.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}