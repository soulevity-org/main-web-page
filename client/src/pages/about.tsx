import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, ArrowRight, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

const founders = [
  {
    name: "Vansh Yadav",
    role: "Founder & CTO",
    about: "Tech enthusiast passionate about revolutionizing education through technology. Leading Soulevity's vision and strategy.",
    image: "./team/vansh.png",
    socials: {
      twitter: "https://x.com/soulevity",
      linkedin: "https://linkedin.com/in/soulucid/",
      github: "https://github.com/soulevity",
      instagram: "https://instagram.com/soulonic"
    }
  },
  {
    name: "Kaleb Arora",
    role: "Co-Founder & CTO",
    about: "Managing operations, and ensure a seamless learning experience by coordinating with educators, tech teams, and support staff.",
    image: "./team/kaleb.png",
    socials: {
      twitter: "https://x.com/kkbutter2281",
      linkedin: "https://linkedin.com/in/kkbutter2281/",
      github: "https://github.com/kkbutter2281",
      instagram: "https://instagram.com/kkbutter2281"
    }
  }
];

const departments = [
  "All",
  "Executives",
  "Development",
  "Management",
  "Marketing"
] as const;

type Department = typeof departments[number];

const teamMembers: Record<Exclude<Department, "All">, Array<{
  name: string;
  role: string;
  about: string;
  image: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
}>> = {
  Executives: [
    {
      name: "Vansh Yadav",
      role: "Chief Technology Officer",
      about: "Technology leader with a focus on scaling platform and creating a seamless learning experience.",
      image: "./team/vansh.png",
      socials: {
        twitter: "https://x.com/soulevity",
        linkedin: "https://linkedin.com/in/soulucid/",
        github: "https://github.com/soulevity",
        instagram: "https://instagram.com/soulonic"
      }
    },
    {
      name: "Kaleb Arora",
      role: "Chief Technology Officer",
      about: "Tech enthusiast focused on building scalable educational platforms. Driving Soulevity's technical innovation.",
      image: "./team/kaleb.png",
      socials: {
        twitter: "https://x.com/kkbutter2281",
        linkedin: "https://linkedin.com/in/kkbutter2281/",
        github: "https://github.com/kkbutter2281",
        instagram: "https://instagram.com/kkbutter2281"
      }
    },
    // Add more executives
  ],
  Development: [],
  Management: [],
  Marketing: []
};

// Function to get all team members across departments
const getAllTeamMembers = () => {
  return Object.values(teamMembers).flat();
};

// Function to check if a department has any members
const hasDepartmentMembers = (dept: Exclude<Department, "All">) => {
  return teamMembers[dept] && teamMembers[dept].length > 0;
};

// Social Media Link component to handle external links
const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      asChild
      className="hover:text-primary transition-colors"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    </Button>
  );
};

// Improved ProfileImage component with better fallback handling
const ProfileImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Reset states when src changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [src]);
  
  // Generate initials from name
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className={`relative overflow-hidden rounded-full bg-primary/10 ${className || ""}`}>
      {!imageError ? (
        <>
          <img 
            src={src} 
            alt={alt} 
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-primary/20 w-full h-full"></div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary">
          <div className="flex items-center justify-center">
            <User className="w-1/2 h-1/2 opacity-70" />
          </div>
          <span className="absolute bottom-0 left-0 right-0 text-center pb-2 font-medium text-xs">
            {getInitials(alt)}
          </span>
        </div>
      )}
    </div>
  );
};

export default function About() {
  const [selectedDepartment, setSelectedDepartment] = useState<Department>("All");

  // Get team members to display based on selected department
  const membersToDisplay = selectedDepartment === "All" 
    ? getAllTeamMembers() 
    : teamMembers[selectedDepartment as Exclude<Department, "All">];

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
          <h2 className="text-3xl font-bold text-center mb-6">Our Team</h2>
          <div className="flex justify-center">
            <Button 
              variant="default" 
              className="mb-12 flex items-center gap-2"
              asChild
            >
              <Link href="/careers">
                Apply to Join Us <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Founders */}
          <div className="grid gap-12 md:grid-cols-2 mb-24">
            {founders.map((founder) => (
              <Card key={founder.name} className="p-4 bg-primary/5">
                <CardHeader>
                  <ProfileImage 
                    src={founder.image} 
                    alt={founder.name} 
                    className="w-32 h-32 mx-auto mb-6" 
                  />
                  <CardTitle className="text-2xl text-center mb-2">{founder.name}</CardTitle>
                  <CardDescription className="text-center text-lg">{founder.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center mb-6 text-muted-foreground">{founder.about}</p>
                  <div className="flex justify-center gap-4">
                    {founder.socials.twitter && (
                      <SocialLink 
                        href={founder.socials.twitter} 
                        icon={<Twitter className="h-5 w-5" />} 
                      />
                    )}
                    {founder.socials.linkedin && (
                      <SocialLink 
                        href={founder.socials.linkedin} 
                        icon={<Linkedin className="h-5 w-5" />} 
                      />
                    )}
                    {founder.socials.github && (
                      <SocialLink 
                        href={founder.socials.github} 
                        icon={<Github className="h-5 w-5" />} 
                      />
                    )}
                    {founder.socials.instagram && (
                      <SocialLink 
                        href={founder.socials.instagram} 
                        icon={<Instagram className="h-5 w-5" />} 
                      />
                    )}
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
                variant={selectedDepartment === dept ? "default" : "outline"}
                className={`min-w-[120px] ${
                  selectedDepartment === dept ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </Button>
            ))}
          </div>

          {/* Apply to This Role Button (for specific departments) */}
          {selectedDepartment !== "All" && (
            <div className="flex justify-center mb-8">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                asChild
              >
                <Link href={`/careers#${selectedDepartment.toLowerCase()}`}>
                  Apply for {selectedDepartment} Roles <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}

          {/* Department Members */}
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            {membersToDisplay.length > 0 ? (
              membersToDisplay.map((member) => (
                <Card key={member.name} className="p-2">
                  <CardHeader>
                    <ProfileImage 
                      src={member.image} 
                      alt={member.name} 
                      className="w-24 h-24 mx-auto mb-4" 
                    />
                    <CardTitle className="text-xl text-center">{member.name}</CardTitle>
                    <CardDescription className="text-center">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center mb-4 text-sm text-muted-foreground">
                      {member.about}
                    </p>
                    <div className="flex justify-center gap-2">
                      {member.socials.twitter && (
                        <SocialLink 
                          href={member.socials.twitter} 
                          icon={<Twitter className="h-4 w-4" />} 
                        />
                      )}
                      {member.socials.linkedin && (
                        <SocialLink 
                          href={member.socials.linkedin} 
                          icon={<Linkedin className="h-4 w-4" />} 
                        />
                      )}
                      {member.socials.github && (
                        <SocialLink 
                          href={member.socials.github} 
                          icon={<Github className="h-4 w-4" />} 
                        />
                      )}
                      {member.socials.instagram && (
                        <SocialLink 
                          href={member.socials.instagram} 
                          icon={<Instagram className="h-4 w-4" />} 
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-xl text-muted-foreground mb-6">No team members currently in this role.</p>
                <Button 
                  variant="default" 
                  className="flex items-center gap-2 mx-auto"
                  onClick={() => setSelectedDepartment("All")}
                >
                  View All Team Members <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}