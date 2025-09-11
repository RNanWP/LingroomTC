import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-academic-navy text-white mt-auto">
      <div className="container px-4">
        <div className="py-6">
          {/* Layout para celulares */}
          <div className="flex flex-col items-center space-y-4 md:hidden">
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/RNanWP/LingroomTC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-primary transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/renanodev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-primary transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            <div className="text-xs text-gray-300 text-center leading-relaxed">
              Direitos autorais © 2025 RenanODev Pós-Tech.
              <br />
              Todos os direitos reservados.
            </div>
          </div>

          {/* Layout de Desktop */}
          <div className="hidden md:flex items-center justify-center space-x-6">
            <a
              href="https://github.com/RNanWP/LingroomTC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-primary transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
            </a>

            <a
              href="https://www.linkedin.com/in/renanodev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-primary transition-colors duration-200"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            <div className="text-sm text-gray-300">
              Direitos autorais © 2025 RenanODev Pós-Tech. Todos os direitos
              reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
