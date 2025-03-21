import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Docs from "@/pages/docs";
import Updates from "@/pages/updates";
import SEOHead from "@/components/seo-head";
import { useEffect, lazy, Suspense } from "react";
import AnimatedBackground from "@/components/background";
import CursorGlow from "@/components/cursor-glow";
import PopupNotification from "@/components/popup-notification";

// Lazy load components for better performance
const LazyHome = lazy(() => import("@/pages/home"));
const LazyAbout = lazy(() => import("@/pages/about"));
const LazyDocs = lazy(() => import("@/pages/docs"));
const LazyUpdates = lazy(() => import("@/pages/updates"));

// Loading component
const PageLoading = () => (
  <div className="flex h-[50vh] w-full items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-foreground">
      <AnimatedBackground />
      <CursorGlow />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoading />}>
          <Switch>
            <Route path="/" component={LazyHome} />
            <Route path="/about" component={LazyAbout} />
            <Route path="/docs" component={LazyDocs} />
            <Route path="/updates" component={LazyUpdates} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      <PopupNotification delay={2000} />
    </div>
  );
}

function App() {
  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  }, []);

  // Add preloading and prefetching for performance
  useEffect(() => {
    // Preload critical images
    const imageUrls = ['/images/soulevity-logo.png'];
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
    
    // Prefetch other pages for faster navigation
    const pagesToPrefetch = ['/about', '/docs', '/updates'];
    pagesToPrefetch.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SEOHead />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;