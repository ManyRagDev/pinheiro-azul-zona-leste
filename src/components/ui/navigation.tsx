import { FileText, Home, Menu, TrendingUp, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/primeiro-imovel", label: "Primeiro Imóvel", icon: Home },
  { href: "/upgrade-moradia", label: "Upgrade", icon: User },
  { href: "/investimento", label: "Investimento", icon: TrendingUp },
  { href: "/blog", label: "Blog", icon: FileText },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-brand-primary">Pinheiro Azul</div>
            <div className="hidden text-sm text-muted-foreground sm:block">Negócios Imobiliários</div>
          </Link>

          <div className="hidden items-center space-x-6 md:flex">
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

          <div className="flex items-center gap-2">
            <Button asChild variant="default" className="hidden bg-brand-accent hover:bg-brand-accent/90 md:inline-flex">
              <Link to="/?diagnostico=1">Receber Diagnóstico</Link>
            </Button>

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Abrir menu">
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="space-y-6">
                    <div className="text-lg font-semibold">Menu</div>
                    <div className="flex flex-col space-y-3">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                              isActive ? "text-brand-primary" : "text-muted-foreground"
                            }`}
                          >
                            <Icon size={18} />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                    <Button asChild variant="default" className="w-full bg-brand-accent hover:bg-brand-accent/90">
                      <Link to="/?diagnostico=1">Receber Diagnóstico</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
