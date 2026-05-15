import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react';

const links = [
  { label: 'Início', href: '/' },
  { label: 'Sobre Nós', href: '/sobre' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
  { label: 'Privacidade', href: '/privacidade' },
];

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function FooterMinimal() {
  return (
    <footer className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#020205] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">PA</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Pinheiro Azul</h3>
                <p className="text-xs text-zinc-600">Negócios Imobiliários</p>
              </div>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
              Especialistas em imóveis na Zona Leste de São Paulo, com atendimento humanizado e
              metodologia exclusiva P.A.Z.©
            </p>
            <div className="mt-4 text-xs text-zinc-700">CRECI J-12345</div>
          </div>

          {/* Links */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em] mb-6">
              Navegação
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em] mb-6">
              Redes Sociais
            </h4>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-700">
            © 2024 Pinheiro Azul Negócios Imobiliários. Todos os direitos reservados.
          </p>
          <p className="text-xs text-zinc-700">
            Zona Leste de São Paulo — Atendimento Humanizado
          </p>
        </div>
      </div>
    </footer>
  );
}
