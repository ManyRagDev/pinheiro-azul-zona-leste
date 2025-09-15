import { Facebook, Instagram, Linkedin, Phone, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-primary text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Pinheiro Azul</h3>
            <p className="text-gray-300 mb-4">
              Negócios Imobiliários na Zona Leste de São Paulo com atendimento humanizado e metodologia P.A.Z.©
            </p>
            <div className="text-sm text-gray-400">
              CRECI J-12345
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-brand-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-brand-accent transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <a href="#imoveis" className="text-gray-300 hover:text-brand-accent transition-colors">
                  Imóveis
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-brand-accent transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-brand-accent flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Rua das Palmeiras, 123<br />
                  Vila Formosa - São Paulo - SP
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-accent flex-shrink-0" />
                <span className="text-gray-300 text-sm">(11) 3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-accent flex-shrink-0" />
                <span className="text-gray-300 text-sm">contato@pinheiroazul.com.br</span>
              </li>
            </ul>
          </div>

          {/* Social Media & Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4 mb-6">
              <a 
                href="#" 
                className="text-gray-300 hover:text-brand-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-brand-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-brand-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
            
            <div className="space-y-2">
              <Link 
                to="/privacy" 
                className="block text-gray-300 hover:text-brand-accent transition-colors text-sm"
              >
                Política de Privacidade
              </Link>
              <a 
                href="#termos" 
                className="block text-gray-300 hover:text-brand-accent transition-colors text-sm"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Pinheiro Azul Negócios Imobiliários. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm">
              Zona Leste de São Paulo - Atendimento Humanizado
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;