import Navigation from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, UserCheck } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-brand-primary to-brand-accent text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Política de Privacidade
            </h1>
            <p className="text-xl opacity-90">
              Transparência e proteção dos seus dados pessoais
            </p>
          </div>
        </section>

        {/* Privacy Cards */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-primary">
                    <Shield className="mr-2" size={24} />
                    Compromisso com a Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Protegemos seus dados pessoais com os mais altos padrões de segurança, 
                    seguindo a Lei Geral de Proteção de Dados (LGPD).
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-primary">
                    <Lock className="mr-2" size={24} />
                    Dados Criptografados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Todas as informações são criptografadas e armazenadas em servidores 
                    seguros, garantindo máxima proteção contra acessos não autorizados.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-primary">
                    <Eye className="mr-2" size={24} />
                    Transparência Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Você tem direito de saber quais dados coletamos, como utilizamos 
                    e pode solicitar alterações ou exclusão a qualquer momento.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-primary">
                    <UserCheck className="mr-2" size={24} />
                    Seu Consentimento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Coletamos dados apenas com seu consentimento expresso e para 
                    finalidades específicas relacionadas aos nossos serviços.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Policy */}
            <div className="space-y-8">
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-brand-primary">
                    1. Informações que Coletamos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>Dados Pessoais:</strong> Nome, e-mail, telefone, CPF/CNPJ, endereço 
                    e outras informações fornecidas voluntariamente durante o cadastro ou contato.
                  </p>
                  <p>
                    <strong>Dados de Navegação:</strong> Informações sobre como você interage com 
                    nosso site, incluindo páginas visitadas, tempo de permanência e preferências.
                  </p>
                  <p>
                    <strong>Dados de Localização:</strong> Informações sobre sua localização para 
                    oferecer imóveis relevantes em sua região de interesse.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-brand-primary">
                    2. Como Utilizamos suas Informações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>Prestação de Serviços:</strong> Para fornecer serviços imobiliários 
                    personalizados, incluindo busca de imóveis, agendamento de visitas e 
                    acompanhamento de processos.
                  </p>
                  <p>
                    <strong>Comunicação:</strong> Para entrar em contato sobre oportunidades 
                    imobiliárias relevantes, atualizações de serviços e comunicações importantes.
                  </p>
                  <p>
                    <strong>Melhorias:</strong> Para aprimorar nossos serviços, desenvolver 
                    novos produtos e personalizar sua experiência.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-brand-primary">
                    3. Compartilhamento de Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>Parceiros Autorizados:</strong> Compartilhamos dados apenas com 
                    parceiros essenciais para a prestação dos serviços (bancos, cartórios, 
                    seguradoras), sempre com sua autorização.
                  </p>
                  <p>
                    <strong>Exigências Legais:</strong> Podemos compartilhar informações quando 
                    exigido por lei, ordem judicial ou autoridades competentes.
                  </p>
                  <p>
                    <strong>Nunca Vendemos:</strong> Jamais vendemos, alugamos ou comercializamos 
                    seus dados pessoais para terceiros.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-brand-primary">
                    4. Seus Direitos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>Acesso:</strong> Solicitar informações sobre quais dados pessoais 
                    possuímos sobre você.
                  </p>
                  <p>
                    <strong>Correção:</strong> Solicitar a correção de dados incompletos, 
                    inexatos ou desatualizados.
                  </p>
                  <p>
                    <strong>Exclusão:</strong> Solicitar a exclusão de seus dados pessoais, 
                    exceto quando necessário para cumprimento de obrigações legais.
                  </p>
                  <p>
                    <strong>Portabilidade:</strong> Solicitar a transferência de seus dados 
                    para outro fornecedor de serviços.
                  </p>
                  <p>
                    <strong>Oposição:</strong> Se opor ao tratamento de seus dados para 
                    finalidades específicas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-brand-primary">
                    5. Segurança e Retenção
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Implementamos medidas técnicas e organizacionais adequadas para proteger 
                    seus dados contra acesso não autorizado, alteração, divulgação ou destruição.
                  </p>
                  <p>
                    Os dados são mantidos pelo tempo necessário para cumprir as finalidades 
                    para as quais foram coletados ou conforme exigido por lei.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-brand-primary">
                    6. Contato e Alterações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Para exercer seus direitos ou esclarecer dúvidas sobre esta política, 
                    entre em contato conosco:
                  </p>
                  <div className="bg-brand-light p-4 rounded-lg">
                    <p><strong>E-mail:</strong> privacidade@pinheiroazul.com.br</p>
                    <p><strong>Telefone:</strong> (11) 3333-4444</p>
                    <p><strong>Endereço:</strong> Rua das Palmeiras, 123 - Tatuapé, São Paulo/SP</p>
                  </div>
                  <p>
                    Esta política pode ser atualizada periodicamente. As alterações serão 
                    comunicadas através do nosso site e por e-mail quando necessário.
                  </p>
                  <p className="text-sm">
                    <strong>Última atualização:</strong> 15 de setembro de 2025
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Privacy;