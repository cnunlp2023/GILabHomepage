// src/App.tsx
import { Suspense, lazy, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const HomePage = lazy(() => import("@/pages/home"));
const MembersPage = lazy(() => import("@/pages/members"));
const ResearchPage = lazy(() => import("@/pages/research"));
const AccessPage = lazy(() => import("@/pages/access"));
const NewsPage = lazy(() => import("@/pages/news"));
const NewsDetailPage = lazy(() => import("@/pages/news-detail"));
const NotFound = lazy(() => import("@/pages/not-found"));

// GitHub Pages base path
const BASE_PATH = import.meta.env.BASE_URL || "/";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/members" component={MembersPage} />
      <Route path="/research" component={ResearchPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/news/:id" component={NewsDetailPage} />
      <Route path="/access" component={AccessPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    const load = () => {
      import("@/pages/members");
      import("@/pages/research");
      import("@/pages/news");
    };

    const id =
      "requestIdleCallback" in window
        ? (window as any).requestIdleCallback(load)
        : setTimeout(load, 1500);

    return () => {
      if ("cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(id);
      } else {
        clearTimeout(id as number);
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={BASE_PATH.replace(/\/$/, "")}>
          <div className="min-h-screen bg-lab-gray">
            <Header />
            <main className="pt-16">
              <Suspense fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
                <Routes />
              </Suspense>
            </main>
            <Footer />
            <Toaster />
          </div>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
