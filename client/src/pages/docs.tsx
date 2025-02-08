import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

const blogs = [
  {
    title: "Getting Started with Machine Learning",
    category: "AI & ML",
    date: "March 1, 2024",
    description:
      "A comprehensive guide to understanding the basics of machine learning and its applications.",
  },
  {
    title: "Web Development Best Practices",
    category: "Development",
    date: "February 28, 2024",
    description:
      "Learn about the latest web development practices and how to implement them in your projects.",
  },
  {
    title: "Understanding Data Science",
    category: "Data Science",
    date: "February 25, 2024",
    description:
      "Explore the fundamentals of data science and how it's shaping the future of technology.",
  },
];

export default function Docs() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mx-auto max-w-3xl"
      >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Documentation & Blogs
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Explore our latest articles, tutorials, and research papers.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <ScrollArea className="h-[600px] rounded-lg border p-4">
          <div className="space-y-8">
            {blogs.map((blog) => (
              <Card key={blog.title}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {blog.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {blog.date}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-center">{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{blog.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>AI & Machine Learning</span>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                  12 articles
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Web Development</span>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                  8 articles
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Data Science</span>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                  15 articles
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}