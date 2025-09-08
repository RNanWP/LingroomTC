import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-academic-navy text-white mt-auto">
      <div className="container">
        <div className="flex items-center justify-center py-6 space-x-6">
          <a
            href="https://github.com/RNanWP/LingroomTC"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-primary transition-colors duration-200"
          >
            <Github className="h-5 w-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/renanodev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-primary transition-colors duration-200"
          >
            <Linkedin className="h-5 w-5" />
          </a>

          <div className="text-sm text-gray-300">
            Direitos autorais © 2025 RenanODev Pós-Tech. Todos os direitos
            reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
