// import { useState } from "react";
import "./Styles/App.scss";
import "./Styles/animation.scss";
import { Footer, NavBar, PointerBall } from "./master";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/shadcn/ui/toaster";
import "@/Styles/App.scss";
// import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono';

function App() {
  // const [isFooterHidden, setIsFooterHidden] = useState(false);
  return (
    <main className={`relative`}>
      {/* GRID */}
      <div className="absolute h-full w-full -z-20 dark:bg-grid-white/[0.08] bg-grid-black/[0.2] pointer-events-none opacity-70">
        {/* BLUR */}
        <div className="absolute -top-10 bg-gradient-to-b from-black to-transparent h-16 w-full backdrop-blur-lg opacity-90" />
        {/* VIGNETTE */}
        <div className="absolute -z-10 pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <NavBar />
      {/* variable Body */}
      <Outlet />
      {/* Footer */}
      <Footer />
      <Toaster />
    </main>
  );
}

export default App;
