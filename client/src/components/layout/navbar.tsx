import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import SignUpDialog from "../sign-up-dialog";
import LoginDialog from "../login-dialog";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Docs", href: "/docs" },
  { name: "About Us", href: "/about" },
  { name: "Updates", href: "/updates" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-6">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">Soulevity</span>
          </Link>
        </div>
        <div className="ml-4 hidden md:block">
          <ModeToggle />
        </div>

        {/* Desktop Navigation */}
        <div className="ml-auto hidden items-center space-x-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === item.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center space-x-4 border-l pl-6">
            <Button variant="ghost" onClick={() => setIsSignUpOpen(true)}>
              Sign Up
            </Button>
            <Button variant="default" onClick={() => setIsLoginOpen(true)}>
              Login
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="ml-auto flex items-center space-x-2 md:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-4 border-border" />
              <Button variant="ghost" onClick={() => setIsSignUpOpen(true)}>
                Sign Up
              </Button>
              <Button variant="default" onClick={() => setIsLoginOpen(true)}>
                Login
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <SignUpDialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen} />
      <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </nav>
  );
}