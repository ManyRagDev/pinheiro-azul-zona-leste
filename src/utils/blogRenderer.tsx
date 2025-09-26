import React from 'react';
import { blogComponents } from '@/components/blog/BlogComponents';

const { Info, Tip, Checklist, Callout, Warning, Contactgit, Image } = blogComponents;

export const renderBlogContent = (htmlContent: string): JSX.Element => {
  // Parse HTML and replace data-component attributes with actual React components
  const processContent = (content: string): JSX.Element => {
    // Split content by component markers and process each part
    const parts = content.split(/(<div data-component="[^"]+"][^>]*>.*?<\/div>)/gs);
    
    return (
      <div>
        {parts.map((part, index) => {
          const componentMatch = part.match(/data-component="([^"]+)"/);
          
          if (componentMatch) {
            const componentName = componentMatch[1];
            const titleMatch = part.match(/data-title="([^"]*)"/);
            const itemsMatch = part.match(/data-items='(\[[^\]]+\])'/);
            const variantMatch = part.match(/data-variant="([^"]*)"/);
            
            const title = titleMatch ? titleMatch[1] : undefined;
            const items = itemsMatch ? JSON.parse(itemsMatch[1]) : undefined;
            const variant = variantMatch ? variantMatch[1] as any : undefined;
            
            // Extract inner content (between opening and closing div tags)
            const innerContentMatch = part.match(/<div[^>]*>(.*)<\/div>/s);
            const innerContent = innerContentMatch ? innerContentMatch[1] : '';
            
            switch (componentName) {
              case 'Info':
                return (
                  <Info key={index} title={title}>
                    <div dangerouslySetInnerHTML={{ __html: innerContent }} />
                  </Info>
                );
              case 'Tip':
                return (
                  <Tip key={index} title={title}>
                    <div dangerouslySetInnerHTML={{ __html: innerContent }} />
                  </Tip>
                );
              case 'Checklist':
                return <Checklist key={index} title={title} items={items || []} />;
              case 'Callout':
                return (
                  <Callout key={index} title={title} variant={variant}>
                    <div dangerouslySetInnerHTML={{ __html: innerContent }} />
                  </Callout>
                );
              case 'Warning':
                return (
                  <Warning key={index} title={title}>
                    <div dangerouslySetInnerHTML={{ __html: innerContent }} />
                  </Warning>
                );
              case 'ContactInfo':
                return <ContactInfo key={index} />;
              default:
                return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
            }
          } else {
            // Regular HTML content
            return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
          }
        })}
      </div>
    );
  };

  return processContent(htmlContent);
};