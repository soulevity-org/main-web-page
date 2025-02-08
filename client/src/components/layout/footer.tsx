import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 max-w-4xl mx-auto text-center">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Platform</h3>
            <div className="flex flex-col gap-3">
              <Link href="/docs" className="text-muted-foreground hover:text-primary">
                Documentation
              </Link>
              <Link href="/updates" className="text-muted-foreground hover:text-primary">
                Updates
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                About Us
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <div className="flex flex-col gap-3">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Soulevity. All rights reserved.
        </div>
      </div>
    </footer>
  );
}