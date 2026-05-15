import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const footerLinks = [
  {
    title: 'Navegação',
    links: [
      { label: 'Início', to: '/' },
      { label: 'Sobre Nós', to: '/sobre' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contato', to: '/contato' },
    ],
  },
  {
    title: 'Imóveis',
    links: [
      { label: 'Apartamentos', to: '#' },
      { label: 'Casas', to: '#' },
      { label: 'Sobrados', to: '#' },
      { label: 'Comerciais', to: '#' },
    ],
  },
  {
    title: 'Bairros',
    links: [
      { label: 'Tatuapé', to: '#' },
      { label: 'Vila Formosa', to: '#' },
      { label: 'Penha', to: '#' },
      { label: 'Mooca', to: '#' },
    ],
  },
];

export function FooterAurora() {
  return (
    <footer className="relative bg-[#050510] border-t border-white/[0.04] overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/[0.03] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                <span className="text-white font-black text-xs">PA</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-none">Pinheiro Azul</div>
                <div className="text-zinc-600 text-[9px] uppercase tracking-wider leading-none mt-0.5">
                  Negócios Imobiliários
                </div>
              </div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-4">
              Excelência no mercado imobiliário da Zona Leste de São Paulo.
            </p>
            <p className="text-xs text-zinc-600">CRECI J-12345</p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Pinheiro Azul Negócios Imobiliários. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacidade" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Privacidade
            </Link>
            <span className="text-zinc-700">·</span>
            <Link to="/privacidade" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
