import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

const links = [
  { path: '/', label: 'Home' },
  { path: '/topics', label: 'Topics' },
  { path: '/helplines', label: 'Helplines' },
  { path: '/about', label: 'About' }
];

export default function Navbar() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false); // scrolling down
        } else {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true); // near top
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-20 z-50 transition-transform duration-400 ease-out glass-panel bg-[#0D0F1A]/80 border-b border-white/5 backdrop-blur-xl flex items-center ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer z-50">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="text-[#7C3AED]"
            >
              <Scale size={24} />
            </motion.div>
            <span className="font-display text-xl font-bold tracking-wider text-[#F9F5FF] group-hover:text-[#7C3AED] transition-colors">
              LegalSaathi
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="relative py-2 text-sm font-medium tracking-wider uppercase transition-colors hover:text-[#F9F5FF] text-[#C4B5FD]"
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-[#F9F5FF]' : ''}>{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7C3AED]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Chat Button (Desktop) & Hamburger (Mobile) */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <MagneticButton
                onClick={() => navigate('/chat')}
                className="px-6 py-2.5 rounded-full bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white font-medium text-sm tracking-wider uppercase transition-shadow hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] cursor-pointer"
              >
                Chat Now
              </MagneticButton>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-[#C4B5FD] hover:text-[#F9F5FF] p-2 focus:outline-none cursor-pointer z-50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 w-screen h-screen bg-[#0D0F1A]/98 z-40 flex flex-col justify-center px-12 md:hidden"
          >
            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="flex flex-col gap-8">
              {links.map((link) => (
                <motion.div key={link.path} variants={linkVariants}>
                  <Link
                    to={link.path}
                    onClick={toggleMobileMenu}
                    className="font-display text-4xl font-bold text-[#C4B5FD] hover:text-[#F9F5FF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={linkVariants} className="pt-6">
                <MagneticButton
                  onClick={() => {
                    toggleMobileMenu();
                    navigate('/chat');
                  }}
                  className="w-full text-center py-4 rounded-full bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white font-semibold tracking-wider uppercase transition-shadow hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] cursor-pointer"
                >
                  Chat Now
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
