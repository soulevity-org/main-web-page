import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          About Soulevity
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Empowering learners through innovative education and community building.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="mt-4 text-muted-foreground">
              To provide accessible, high-quality education and foster a community
              of lifelong learners passionate about personal and professional
              growth.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold">Our Vision</h2>
            <p className="mt-4 text-muted-foreground">
              To become the leading platform for transformative learning
              experiences, connecting learners with expert knowledge and vibrant
              communities.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Our Values</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Excellence",
              description:
                "We strive for excellence in everything we do, from course content to community support.",
            },
            {
              title: "Innovation",
              description:
                "We embrace new ideas and technologies to enhance the learning experience.",
            },
            {
              title: "Community",
              description:
                "We believe in the power of community to inspire and support growth.",
            },
          ].map((value) => (
            <Card key={value.title}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
