import React from 'react';
import { CheckCircle, Info as InfoIcon, Lightbulb, AlertTriangle, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

export const Image: React.FC<ImageProps> = ({ src, alt, className, caption }) => {
  return (
    <figure className={cn("my-8", className)}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full rounded-lg shadow-sm border border-border"
        loading="lazy"
      />
      {caption && (
        <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

interface InfoProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Info: React.FC<InfoProps> = ({ children, title, className }) => {
  return (
    <div className={cn(
      "my-6 p-6 bg-blue-50/50 border border-blue-200/50 rounded-lg",
      "dark:bg-blue-950/20 dark:border-blue-800/30",
      className
    )}>
      <div className="flex items-start space-x-3">
        <InfoIcon className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              {title}
            </h4>
          )}
          <div className="text-blue-800 dark:text-blue-200 [&>p]:mb-2 [&>ul]:mb-2 [&>ol]:mb-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TipProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Tip: React.FC<TipProps> = ({ children, title, className }) => {
  return (
    <div className={cn(
      "my-6 p-6 bg-yellow-50/50 border border-yellow-200/50 rounded-lg",
      "dark:bg-yellow-950/20 dark:border-yellow-800/30",
      className
    )}>
      <div className="flex items-start space-x-3">
        <Lightbulb className="flex-shrink-0 w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              {title}
            </h4>
          )}
          <div className="text-yellow-800 dark:text-yellow-200 [&>p]:mb-2 [&>ul]:mb-2 [&>ol]:mb-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChecklistProps {
  items: string[];
  title?: string;
  className?: string;
}

export const Checklist: React.FC<ChecklistProps> = ({ items, title, className }) => {
  return (
    <div className={cn(
      "my-6 p-6 bg-green-50/50 border border-green-200/50 rounded-lg",
      "dark:bg-green-950/20 dark:border-green-800/30",
      className
    )}>
      {title && (
        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
          {title}
        </h4>
      )}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start space-x-3 text-green-800 dark:text-green-200">
            <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface CalloutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

export const Callout: React.FC<CalloutProps> = ({ 
  children, 
  title, 
  className, 
  variant = 'default' 
}) => {
  const variants = {
    default: "bg-muted/50 border-border text-foreground",
    primary: "bg-brand-primary/5 border-brand-primary/20 text-foreground",
    success: "bg-green-50/50 border-green-200/50 text-green-900 dark:bg-green-950/20 dark:border-green-800/30 dark:text-green-100",
    warning: "bg-orange-50/50 border-orange-200/50 text-orange-900 dark:bg-orange-950/20 dark:border-orange-800/30 dark:text-orange-100"
  };

  return (
    <div className={cn(
      "my-8 p-6 border rounded-lg",
      variants[variant],
      className
    )}>
      {title && (
        <h4 className="font-bold text-lg mb-4">
          {title}
        </h4>
      )}
      <div className="[&>p]:mb-3 [&>ul]:mb-3 [&>ol]:mb-3 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
};

interface WarningProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Warning: React.FC<WarningProps> = ({ children, title, className }) => {
  return (
    <div className={cn(
      "my-6 p-6 bg-red-50/50 border border-red-200/50 rounded-lg",
      "dark:bg-red-950/20 dark:border-red-800/30",
      className
    )}>
      <div className="flex items-start space-x-3">
        <AlertTriangle className="flex-shrink-0 w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
              {title}
            </h4>
          )}
          <div className="text-red-800 dark:text-red-200 [&>p]:mb-2 [&>ul]:mb-2 [&>ol]:mb-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente especializado para informações de contato
interface ContactInfoProps {
  phone?: string;
  address?: string;
  className?: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ 
  phone = "(11) 98765-4321", 
  address = "Zona Leste, São Paulo - SP",
  className 
}) => {
  return (
    <div className={cn(
      "my-6 p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-lg",
      className
    )}>
      <h4 className="font-semibold text-brand-primary mb-4">
        Entre em Contato Conosco
      </h4>
      <div className="space-y-2">
        {phone && (
          <div className="flex items-center space-x-2 text-foreground">
            <Phone className="w-4 h-4 text-brand-primary" />
            <span>{phone}</span>
          </div>
        )}
        {address && (
          <div className="flex items-center space-x-2 text-foreground">
            <MapPin className="w-4 h-4 text-brand-primary" />
            <span>{address}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const blogComponents = {
  img: Image,
  Image,
  Info,
  Tip,
  Checklist,
  Callout,
  Warning,
  ContactInfo
};