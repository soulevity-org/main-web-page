import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

const founders = [
  {
    name: "Vansh Yadav",
    role: "Co-Founder & CEO",
    about: "Passionate about revolutionizing education through technology. Leading Soulevity's vision and strategy.",
    image: "/vansh.jpg",
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Kaleb Arora",
    role: "Co-Founder & CTO",
    about: "Tech enthusiast focused on building scalable educational platforms. Driving Soulevity's technical innovation.",
    image: "/kaleb.jpg",
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  }
];

const departments = [
  "Executives",
  "Development",
  "Management",
  "Marketing"
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Main Content Section */}
      <div className="container px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mx-auto max-w-3xl mb-24"
        >
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            About Soulevity
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Empowering learners through innovative education and community building.
          </p>
        </motion.div>

        {/* Mission & Vision Section */}
        <div className="grid gap-12 md:grid-cols-2 mb-24">
          <Card className="p-2">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-center mb-6">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide accessible, high-quality education and foster a community
                of lifelong learners passionate about personal and professional
                growth.
              </p>
            </CardContent>
          </Card>

          <Card className="p-2">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-center mb-6">Our Vision</h2>
              <p className="text-muted-foreground">
                To become the leading platform for transformative learning
                experiences, connecting learners with expert knowledge and vibrant
                communities.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
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
              <Card key={value.title} className="p-2">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-center mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>

          {/* Founders */}
          <div className="grid gap-12 md:grid-cols-2 mb-24">
            {founders.map((founder) => (
              <Card key={founder.name} className="p-4 bg-primary/5">
                <CardHeader>
                  <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full bg-primary/10">
                    {/* Add founder image here */}
                  </div>
                  <CardTitle className="text-2xl text-center mb-2">{founder.name}</CardTitle>
                  <CardDescription className="text-center text-lg">{founder.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center mb-6 text-muted-foreground">{founder.about}</p>
                  <div className="flex justify-center gap-4">
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Department Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant="outline"
                className="min-w-[120px]"
              >
                {dept}
              </Button>
            ))}
          </div>

          {/* Department Members Template */}
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            {/* Template for team member card - to be populated dynamically */}
            <Card className="p-2">
              <CardHeader>
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full bg-primary/10">
                  {/* Member image */}
                </div>
                <CardTitle className="text-xl text-center">Member Name</CardTitle>
                <CardDescription className="text-center">Role</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center mb-4 text-sm text-muted-foreground">
                  Brief description about the team member.
                </p>
                <div className="flex justify-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}