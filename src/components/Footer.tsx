import Link from "next/link";
import { Github, Mail, ExternalLink } from "lucide-react";

export function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={`bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className="flex flex-col items-center justify-center py-10 md:gap-2 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {currentYear} Hylo. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/rtrinh760/hylo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
          <Link
            href="mailto:rtrinh760@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </Link>
          <Link
            href="https://rtrinh760.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Portfolio"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
} 