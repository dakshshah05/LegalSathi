import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#13152A] border-t border-white/5 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Scale className="text-[#7C3AED]" size={24} />
              <span className="font-display text-xl font-bold tracking-wider text-[#F9F5FF]">
                LegalSaathi
              </span>
            </div>
            <p className="text-sm text-[#C4B5FD] leading-relaxed max-w-sm">
              Empowering women across India with direct, private, and plain-language access to legal guidance. Know your rights and advocate for your protection.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-lg text-[#F9F5FF] tracking-wide">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#C4B5FD]">
              <li>
                <Link to="/" className="hover:text-[#F472B6] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/topics" className="hover:text-[#F472B6] transition-colors">Legal Topics</Link>
              </li>
              <li>
                <Link to="/helplines" className="hover:text-[#F472B6] transition-colors">National Helplines</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F472B6] transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-lg text-[#F9F5FF] tracking-wide">
              Urgent Support
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#C4B5FD]">
              <li className="flex justify-between items-center max-w-xs">
                <span>Women Helpline:</span>
                <span className="font-bold text-[#F472B6]">181</span>
              </li>
              <li className="flex justify-between items-center max-w-xs">
                <span>Police Response:</span>
                <span className="font-bold text-[#F472B6]">100</span>
              </li>
              <li className="flex justify-between items-center max-w-xs">
                <span>NALSA Legal Aid:</span>
                <span className="font-bold text-[#F472B6]">15100</span>
              </li>
              <li className="flex justify-between items-center max-w-xs">
                <span>Childline Assistance:</span>
                <span className="font-bold text-[#F472B6]">1098</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B7280] text-center sm:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} LegalSaathi. Built for women, by people who care. 
            <br className="sm:hidden" />
            <span className="sm:ml-2 font-medium text-[#F472B6]/90">
              Disclaimer: LegalSaathi provides legal guidelines, not professional legal advice.
            </span>
          </p>
          
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6B7280] hover:text-[#F9F5FF] transition-colors p-2"
            aria-label="GitHub link"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
