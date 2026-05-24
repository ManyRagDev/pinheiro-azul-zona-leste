import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Mail, Sparkles } from "lucide-react";
import andre from "@/assets/andre.jpg";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import {
  classifyLead,
  guideByProfile,
  guideLabels,
  profileLabels,
  profileSummaries,
  submitLead,
  type FunnelAnswers,
  type LeadProfile,
} from "@/lib/funnel";

// TODO: atualizar com o número real do WhatsApp do André
const WHATSAPP_ANDRE = "https://wa.me/5511999999999";

type Stage = "questions" | "contact" | "result";

type FunnelDiagnosticModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialProfile?: LeadProfile;
  sourcePage: string;
};

const defaultAnswers: FunnelAnswers = {
  objetivo: "",
  faixa_preco: "",
  regiao_interesse: "",
  prazo: "",
  tipo_imovel: "",
};

const questions = [
  {
    id: "objetivo",
    label: "Qual é seu objetivo agora?",
    options: [
      "Comprar meu primeiro imóvel",
      "Trocar por um imóvel melhor",
      "Investir para renda ou valorização",
      "Vender meu imóvel com estratégia",
    ],
  },
  {
    id: "faixa_preco",
    label: "Qual faixa deixa a decisão mais realista?",
    options: ["Até R$ 350 mil", "R$ 350 mil a R$ 600 mil", "R$ 600 mil a R$ 1 milhão", "Acima de R$ 1 milhão"],
  },
  {
    id: "regiao_interesse",
    label: "Qual região da Zona Leste está no seu radar?",
    options: ["Itaquera/Penha", "Vila Matilde/Carrão", "Tatuapé/Anália Franco", "Ainda quero orientação"],
  },
  {
    id: "prazo",
    label: "Em quanto tempo você quer avançar?",
    options: ["Até 30 dias", "1 a 3 meses", "3 a 6 meses", "Estou pesquisando"],
  },
  {
    id: "tipo_imovel",
    label: "Qual tipo de imóvel combina mais com o momento?",
    options: ["Apartamento compacto", "2 dormitórios", "3 dormitórios ou casa", "Imóvel para venda/captação"],
  },
] as const;

export function FunnelDiagnosticModal({
  open,
  onOpenChange,
  initialProfile,
  sourcePage,
}: FunnelDiagnosticModalProps) {
  const { toast } = useToast();
  const [stage, setStage] = useState<Stage>("questions");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FunnelAnswers>(defaultAnswers);
  const [contact, setContact] = useState({ nome: "", email: "", whatsapp: "" });
  const [resolvedProfile, setResolvedProfile] = useState<LeadProfile>(initialProfile ?? "primeiro_imovel");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setResolvedProfile(initialProfile ?? "primeiro_imovel");
    }
  }, [initialProfile, open]);

  const currentQuestion = questions[step];
  const selectedAnswer = answers[currentQuestion.id];
  const isContactValid = contact.nome.trim() && contact.email.includes("@") && contact.whatsapp.trim().length >= 8;
  const result = profileSummaries[resolvedProfile];

  const progress = useMemo(() => {
    if (stage === "questions") {
      return ((step + 1) / questions.length) * 62;
    }

    return stage === "contact" ? 82 : 100;
  }, [stage, step]);

  const setAnswer = (value: string) => {
    setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));
  };

  const next = () => {
    if (step < questions.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    setResolvedProfile(classifyLead(answers, initialProfile));
    setStage("contact");
  };

  const previous = () => {
    if (stage === "result") {
      setStage("contact");
      return;
    }

    if (stage === "contact") {
      setStage("questions");
      return;
    }

    setStep((current) => Math.max(0, current - 1));
  };

  const submit = async () => {
    const perfil = classifyLead(answers, initialProfile);
    setResolvedProfile(perfil);
    setIsSubmitting(true);

    try {
      await submitLead({
        ...contact,
        perfil,
        origem_pagina: sourcePage,
        guia_solicitado: guideByProfile[perfil],
        respostas: answers,
      });

      setStage("result");
      toast({
        title: "Diagnóstico recebido!",
        description: "Seu perfil foi registrado. A equipe Pinheiro Azul vai entrar em contato em breve.",
      });
    } catch (error) {
      console.error("Lead submit error", error);
      toast({
        title: "Não foi possível salvar agora",
        description: "Tente novamente em instantes ou chame a equipe pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      window.setTimeout(() => {
        setStage("questions");
        setStep(0);
        setAnswers(defaultAnswers);
        setContact({ nome: "", email: "", whatsapp: "" });
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-[#06192c] bg-[#f4f0e8] text-[#06192c] sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-left text-2xl font-black uppercase leading-none">
            Diagnóstico Pinheiro Azul
          </DialogTitle>
        </DialogHeader>

        <div className="h-2 border border-[#06192c]/20 bg-white">
          <div className="h-full bg-[#e43d30] transition-all" style={{ width: `${progress}%` }} />
        </div>

        {stage === "questions" && (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#e43d30]">
                Pergunta {step + 1} de {questions.length}
              </p>
              <h3 className="mt-3 text-2xl font-black leading-tight">{currentQuestion.label}</h3>
            </div>

            <RadioGroup value={selectedAnswer} onValueChange={setAnswer} className="grid gap-3">
              {currentQuestion.options.map((option) => (
                <Label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 border border-[#06192c]/20 bg-white p-4 text-sm font-bold transition hover:border-[#06192c]"
                >
                  <RadioGroupItem value={option} />
                  <span>{option}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {stage === "contact" && (
          <div className="space-y-6">
            <div className="border border-[#06192c] bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#e43d30]">Quase lá</p>
              <h3 className="mt-3 text-2xl font-black leading-tight">
                Deixe seu contato. A gente chega com as respostas certas para o seu momento.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#415064]">
                Nada de lista genérica. Com base no seu diagnóstico, a Pinheiro Azul vai indicar as opções que fazem sentido de verdade.
              </p>
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="lead-name">Nome</Label>
                <Input
                  id="lead-name"
                  value={contact.nome}
                  onChange={(event) => setContact((current) => ({ ...current, nome: event.target.value }))}
                  className="mt-1 border-[#06192c]/25 bg-white"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <Label htmlFor="lead-email">Email</Label>
                <Input
                  id="lead-email"
                  type="email"
                  value={contact.email}
                  onChange={(event) => setContact((current) => ({ ...current, email: event.target.value }))}
                  className="mt-1 border-[#06192c]/25 bg-white"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <Label htmlFor="lead-whatsapp">WhatsApp</Label>
                <Input
                  id="lead-whatsapp"
                  value={contact.whatsapp}
                  onChange={(event) => setContact((current) => ({ ...current, whatsapp: event.target.value }))}
                  className="mt-1 border-[#06192c]/25 bg-white"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </div>
        )}

        {stage === "result" && (
          <div className="space-y-6">
            <div className="border border-[#06192c] bg-white p-6">
              <div className="mb-5 flex items-center gap-3 text-[#e43d30]">
                <CheckCircle2 />
                <span className="text-xs font-black uppercase tracking-[0.22em]">Perfil classificado</span>
              </div>
              <h3 className="text-3xl font-black uppercase leading-none">{profileLabels[resolvedProfile]}</h3>
              <p className="mt-4 text-base leading-relaxed text-[#415064]">{result.copy}</p>
              <div className="mt-5 inline-flex items-center gap-2 bg-[#06192c] px-4 py-3 text-sm font-black uppercase text-white">
                <Mail size={16} />
                {guideLabels[resolvedProfile]}
              </div>
            </div>
            <div className="flex items-start gap-4 border border-[#06192c] bg-white p-5">
              <img
                src={andre}
                alt="André F. — Pinheiro Azul"
                className="h-12 w-12 shrink-0 rounded-full object-cover"
                style={{ objectPosition: "center 15%" }}
              />
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#06192c]">André F.</p>
                <p className="mt-2 text-sm leading-relaxed text-[#415064]">
                  Com esse perfil já tenho algumas direções em mente. Vamos conversar?
                </p>
                <a
                  href={WHATSAPP_ANDRE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-[#e43d30] px-4 py-2 text-xs font-black uppercase text-white transition hover:bg-[#06192c]"
                >
                  Falar com André
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={previous}
            disabled={stage === "questions" && step === 0}
            className="border-[#06192c] bg-transparent"
          >
            <ChevronLeft size={16} />
            Voltar
          </Button>

          {stage === "questions" && (
            <Button type="button" onClick={next} disabled={!selectedAnswer} className="bg-[#06192c] text-white">
              Próximo
              <ChevronRight size={16} />
            </Button>
          )}

          {stage === "contact" && (
            <Button type="button" onClick={submit} disabled={!isContactValid || isSubmitting} className="bg-[#e43d30] text-white">
              {isSubmitting ? "Salvando..." : "Receber diagnóstico"}
              <Sparkles size={16} />
            </Button>
          )}

          {stage === "result" && (
            <Button type="button" onClick={() => resetAndClose(false)} className="bg-[#06192c] text-white">
              Fechar
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
