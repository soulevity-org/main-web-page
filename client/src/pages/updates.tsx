import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

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
];

export default function Updates() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <Bell className="h-8 w-8 text-primary" />
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Soulevity Updates
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Stay informed about the latest changes and announcements.
          </p>
        </div>
      </motion.div>

      <div className="mt-16 space-y-8">
        {updates.map((update) => (
          <motion.div
            key={update.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{update.title}</CardTitle>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    {update.type}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {update.date}
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
