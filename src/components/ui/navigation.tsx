import { Button } from "@/components/ui/button";
import { Home, User, Phone, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/sobre", label: "Sobre Nós", icon: User },
    { href: "/contato", label: "Contato", icon: Phone },
    { href: "/privacidade", label: "Privacidade", icon: FileText },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-brand-primary">
              Pinheiro Azul
            </div>
            <div className="text-sm text-muted-foreground hidden sm:block">
              Negócios Imobiliários
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-brand-accent ${
                    isActive ? "text-brand-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <Button variant="default" className="bg-brand-accent hover:bg-brand-accent/90">
            Buscar Imóveis
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;