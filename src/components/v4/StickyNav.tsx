import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Início', href: '#top' },
  { label: 'Números', href: '#aurora-stats' },
  { label: 'Metodologia', href: '#aurora-method' },
  { label: 'Imóveis', href: '#aurora-gallery' },
  { label: 'Depoimentos', href: '#aurora-testimonials' },
  { label: 'Contato', href: '#aurora-contact' },
];

export function StickyNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 80);
  });

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#050510]/80 backdrop-blur-2xl border-b border-white/[0.04]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 group-hover:from-blue-400 group-hover:to-violet-400 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-black text-sm">PA</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm tracking-tight leading-none">
                Pinheiro Azul
              </div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-wider leading-none mt-0.5">
                Negócios Imobiliários
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/[0.04]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contato"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#050510] font-semibold text-xs rounded-full hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all duration-300"
            >
              Buscar Imóveis
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors rounded-xl hover:bg-white/[0.04]"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-0 z-40 bg-[#050510]/98 backdrop-blur-3xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-bold text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Link
                  to="/contato"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#050510] font-semibold text-base rounded-full"
                >
                  Buscar Imóveis
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
