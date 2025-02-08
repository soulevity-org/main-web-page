import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Platform</h3>
            <Link href="/docs" className="text-muted-foreground hover:text-primary">
              Documentation
            </Link>
            <Link href="/updates" className="text-muted-foreground hover:text-primary">
              Updates
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Company</h3>
            <Link href="/about" className="text-muted-foreground hover:text-primary">
              About Us
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Legal</h3>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Connect</h3>
            <a href="#" className="text-muted-foreground hover:text-primary">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              LinkedIn
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Soulevity. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
