import React from "react";

export const AuthFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-medium text-muted py-4 border-t border-border/60">
      <p>© {currentYear} BuniyaadEC Inc. All rights reserved.</p>
      <nav aria-label="Auth legal navigation" className="flex items-center gap-4">
        <a href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
        <a href="#terms" className="hover:text-foreground transition-colors">Terms of Service</a>
        <a href="#contact" className="hover:text-foreground transition-colors">Security & Compliance</a>
      </nav>
    </footer>
  );
};