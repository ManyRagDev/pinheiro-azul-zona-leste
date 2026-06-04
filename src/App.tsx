import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import HomeIndex4 from "./pages/HomeIndex4";
import PrimeiroImovelV2 from "./pages/PrimeiroImovelV2";
import UpgradeMoradiaV2 from "./pages/UpgradeMoradiaV2";
import InvestimentoV2 from "./pages/InvestimentoV2";
import SellerLandingV2 from "./pages/SellerLandingV2";
import InteligenciaImobiliaria from "./pages/InteligenciaImobiliaria";
import InteligenciaMesaDecisao from "./pages/InteligenciaMesaDecisao";
import InteligenciaImobiliaria3 from "./pages/InteligenciaImobiliaria3";
import InteligenciaImobiliaria4 from "./pages/InteligenciaImobiliaria4";
import Inteligencia5 from "./pages/Inteligencia5";
import Inteligencia6 from "./pages/Inteligencia6";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeIndex4 />} />
          <Route path="/index4" element={<Navigate to="/" replace />} />
          <Route path="/primeiro-imovel" element={<PrimeiroImovelV2 />} />
          <Route path="/upgrade-moradia" element={<UpgradeMoradiaV2 />} />
          <Route path="/investimento" element={<InvestimentoV2 />} />
          <Route path="/anuncie-seu-imovel" element={<SellerLandingV2 />} />
          <Route path="/inteligencia" element={<InteligenciaImobiliaria />} />
          <Route path="/inteligencia2" element={<InteligenciaMesaDecisao />} />
          <Route path="/inteligencia3" element={<InteligenciaImobiliaria3 />} />
          <Route path="/inteligencia4" element={<InteligenciaImobiliaria4 />} />
          <Route path="/inteligencia5" element={<Inteligencia5 />} />
          <Route path="/inteligencia6" element={<Inteligencia6 />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/privacidade" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
