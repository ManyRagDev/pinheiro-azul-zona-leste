import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight, ChevronLeft, Target, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface DiagnosticData {
  intencao: string;
  prioridade_loc: string;
  estilo_vida: string;
  acabamento: string;
  faixa_preco: string;
  nome_lead: string;
  email_lead: string;
  whatsapp_lead: string;
}

interface CalculatedProfile {
  score_compatibilidade: number;
  perfil_nome: string;
}

interface DiagnosticModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Função para calcular o perfil baseado nas respostas
const calculateProfile = (formData: DiagnosticData): CalculatedProfile => {
  // Score sempre 100 (potencial máximo de compatibilidade)
  const score_compatibilidade = 100;
  
  // Gerar nome do perfil baseado em estilo_vida + prioridade_loc
  const generateProfileName = (estiloVida: string, prioridadeLoc: string): string => {
    const estiloMap: { [key: string]: string } = {
      'Home Office e Foco': 'O Profissional Produtivo',
      'Vida Social': 'O Anfitrião Urbano',
      'Refúgio Familiar': 'O Refúgio da Família'
    };
    
    const localizacaoMap: { [key: string]: string } = {
      'Acesso Rápido': 'que prioriza Mobilidade',
      'Paz e Natureza': 'que busca Tranquilidade',
      'Serviços Pertos': 'que valoriza Conveniência'
    };
    
    const estiloNome = estiloMap[estiloVida] || 'O Morador Ideal';
    const localizacaoNome = localizacaoMap[prioridadeLoc] || 'da Zona Leste';
    
    return `${estiloNome} ${localizacaoNome}`;
  };
  
  const perfil_nome = generateProfileName(formData.estilo_vida, formData.prioridade_loc);
  
  return {
    score_compatibilidade,
    perfil_nome
  };
};

const questions = [
  {
    id: 'intencao',
    question: 'Para começar, qual é o seu grande objetivo agora?',
    options: [
      { value: 'Compra', label: 'Comprar meu primeiro imóvel ou trocar para um melhor' },
      { value: 'Aluguel', label: 'Encontrar o aluguel ideal para minha nova fase' },
      { value: 'Investir', label: 'Investir em imóveis para gerar renda ou valorização' }
    ]
  },
  {
    id: 'prioridade_loc',
    question: 'Ok! Pensando na sua rotina, o que é inegociável na localização?',
    options: [
      { value: 'Acesso Rápido', label: 'Acesso rápido ao trabalho/centro da cidade' },
      { value: 'Paz e Natureza', label: 'Tranquilidade e contato com a natureza' },
      { value: 'Serviços Pertos', label: 'Proximidade de comércios, escolas e serviços' }
    ]
  },
  {
    id: 'estilo_vida',
    question: 'Como você vive o seu lar hoje?',
    options: [
      { value: 'Home Office e Foco', label: 'Trabalho de casa e preciso de espaços funcionais' },
      { value: 'Vida Social', label: 'Recebo amigos e família com frequência' },
      { value: 'Refúgio Familiar', label: 'Meu lar é meu refúgio para relaxar com a família' }
    ]
  },
  {
    id: 'acabamento',
    question: 'E qual sentimento precisa dominar quando você entrar na sua nova porta?',
    options: [
      { value: 'Modernidade e Exclusividade', label: 'Modernidade e exclusividade' },
      { value: 'Aconchego e Espaço', label: 'Aconchego e amplitude' },
      { value: 'Praticidade e Economia', label: 'Praticidade e economia' }
    ]
  },
  {
    id: 'faixa_preco',
    question: 'Combinado! Para termos foco e não perdermos tempo, qual faixa de investimento deixa você mais tranquilo(a)?',
    options: [
      { value: 'Até R$ 350 mil', label: 'Até R$ 350 mil' },
      { value: 'De R$ 350 mil a R$ 600 mil', label: 'De R$ 350 mil a R$ 600 mil' },
      { value: 'De R$ 600 mil a R$ 1 Milhão', label: 'De R$ 600 mil a R$ 1 Milhão' },
      { value: 'Acima de R$ 1 Milhão', label: 'Acima de R$ 1 Milhão' }
    ]
  }
];

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStage, setCurrentStage] = useState<'questions' | 'result' | 'contact'>('questions');
  const [formData, setFormData] = useState<DiagnosticData>({
    intencao: '',
    prioridade_loc: '',
    estilo_vida: '',
    acabamento: '',
    faixa_preco: '',
    nome_lead: '',
    email_lead: '',
    whatsapp_lead: ''
  });
  const [calculatedProfile, setCalculatedProfile] = useState<CalculatedProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const isQuestionsComplete = questions.every(q => formData[q.id as keyof DiagnosticData]);
  const isContactComplete = formData.nome_lead && formData.email_lead && formData.whatsapp_lead;

  const handleQuestionAnswer = (questionId: string, value: string) => {
    setFormData(prev => ({ ...prev, [questionId]: value }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === questions.length - 1) {
      // Última pergunta respondida - calcular perfil e mostrar resultado
      const profile = calculateProfile(formData);
      setCalculatedProfile(profile);
      setCurrentStage('result');
    }
  };

  const prevStep = () => {
    if (currentStage === 'result') {
      setCurrentStage('questions');
    } else if (currentStage === 'contact') {
      setCurrentStage('result');
    } else if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToContactForm = () => {
    setCurrentStage('contact');
  };

  const viewCompatibleProperties = () => {
    // Fechar modal e redirecionar para busca com filtros aplicados
    onOpenChange(false);
    // Aqui poderia implementar a lógica de redirecionamento com filtros
    toast({
      title: "Redirecionando...",
      description: "Você será direcionado para imóveis compatíveis com seu perfil.",
    });
  };

  const submitDiagnostic = async () => {
    if (!calculatedProfile) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('leads_diagnostico_pinheiro_azul')
        .insert({
          nome_lead: formData.nome_lead,
          email_lead: formData.email_lead,
          whatsapp_lead: formData.whatsapp_lead,
          intencao: formData.intencao,
          prioridade_loc: formData.prioridade_loc,
          estilo_vida: formData.estilo_vida,
          acabamento: formData.acabamento,
          faixa_preco: formData.faixa_preco,
          resultado_diagnostico: calculatedProfile.score_compatibilidade,
          perfil_nome: calculatedProfile.perfil_nome,
          data_captura: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Análise solicitada com sucesso!",
        description: "Em breve nossa equipe enviará sua análise detalhada de perfil.",
      });

      onOpenChange(false);
      // Reset form
      setFormData({
        intencao: '',
        prioridade_loc: '',
        estilo_vida: '',
        acabamento: '',
        faixa_preco: '',
        nome_lead: '',
        email_lead: '',
        whatsapp_lead: ''
      });
      setCurrentStep(0);
      setCurrentStage('questions');
      setCalculatedProfile(null);
    } catch (error) {
      console.error('Error submitting diagnostic:', error);
      toast({
        title: "Erro ao enviar solicitação",
        description: "Tente novamente em alguns momentos.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (currentStage === 'questions') {
      const question = questions[currentStep];
      const selectedValue = formData[question.id as keyof DiagnosticData];

      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">
              Pergunta {currentStep + 1} de {questions.length}
            </div>
            <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
          </div>

          <RadioGroup
            value={selectedValue}
            onValueChange={(value) => handleQuestionAnswer(question.id, value)}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="flex-1 text-sm font-medium leading-relaxed cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    }

    if (currentStage === 'result' && calculatedProfile) {
      return (
        <div className="space-y-6 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center">
                <Star className="w-10 h-10 text-brand-accent fill-current" />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-brand-primary mb-2">
                Seu Imóvel Ideal: {calculatedProfile.perfil_nome}
              </h3>
              <div className="text-3xl font-bold text-brand-accent mb-4">
                Seu Índice de Compatibilidade Imobiliária é de {calculatedProfile.score_compatibilidade}/100!
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={viewCompatibleProperties}
                size="lg" 
                className="w-full bg-brand-accent hover:bg-brand-accent/90"
              >
                <Target className="mr-2" size={20} />
                Ver Imóveis Compatíveis Agora
              </Button>
              
              <div className="text-sm text-muted-foreground">ou</div>
              
              <Button 
                onClick={goToContactForm}
                variant="outline"
                size="lg" 
                className="w-full"
              >
                Quero Minha Análise Detalhada
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (currentStage === 'contact') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Quase pronto!</h3>
            <p className="text-muted-foreground mb-6">
              Quer saber <strong>exatamente</strong> por que este score foi gerado e receber a análise detalhada do seu perfil com dicas sobre os melhores bairros da ZL para você?
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                value={formData.nome_lead}
                onChange={(e) => handleContactChange('nome_lead', e.target.value)}
                placeholder="Digite seu nome"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email_lead}
                onChange={(e) => handleContactChange('email_lead', e.target.value)}
                placeholder="seu@email.com"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp_lead}
                onChange={(e) => handleContactChange('whatsapp_lead', e.target.value)}
                placeholder="(11) 99999-9999"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Diagnóstico de Perfil Ideal
          </DialogTitle>
        </DialogHeader>

        {renderContent()}

        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0 && currentStage === 'questions'}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>

          <div className="flex-1 mx-4">
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: currentStage === 'questions' 
                    ? `${((currentStep + 1) / questions.length) * 60}%`
                    : currentStage === 'result' 
                    ? '80%' 
                    : '100%'
                }}
              />
            </div>
          </div>

          {currentStage === 'questions' ? (
            <Button
              onClick={nextStep}
              disabled={!formData[questions[currentStep].id as keyof DiagnosticData]}
              className="flex items-center"
            >
              Próximo
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : currentStage === 'result' ? (
            <div className="invisible">
              {/* Spacer to maintain layout */}
            </div>
          ) : (
            <Button
              onClick={submitDiagnostic}
              disabled={!isContactComplete || loading}
              className="flex items-center"
            >
              {loading ? 'Enviando...' : 'Solicitar Análise Detalhada'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};