'use client';

import { BlocksRenderer, BlocksContent } from '@strapi/blocks-react-renderer';

interface ThapVanPhongContentProps {
  content: BlocksContent;
}

/**
 * Component to render Strapi Blocks content for Thap Van Phong
 * Uses @strapi/blocks-react-renderer to convert blocks to React elements
 */
export function ThapVanPhongContent({ content }: ThapVanPhongContentProps) {
  return (
    <div className="desc text-gray-800 leading-relaxed">
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => <p className="mb-4">{children}</p>,
          list: ({ children, format }) => {
            if (format === 'unordered') {
              return <ul className="list-disc pl-5 mb-4 text-gray-800">{children}</ul>;
            }
            return <ol className="list-decimal pl-5 mb-4 text-gray-800">{children}</ol>;
          },
          'list-item': ({ children }) => <li>{children}</li>,
          link: ({ children, url }) => (
            <a
              href={url}
              className="text-primary-600 hover:underline"
              target={url.startsWith('http') ? '_blank' : undefined}
              rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          heading: ({ children, level }) => {
            const className = level === 1 ? 'text-2xl font-bold mb-4' : 'text-xl font-semibold mb-3';
            switch (level) {
              case 1:
                return <h1 className={className}>{children}</h1>;
              case 2:
                return <h2 className={className}>{children}</h2>;
              case 3:
                return <h3 className={className}>{children}</h3>;
              case 4:
                return <h4 className={className}>{children}</h4>;
              case 5:
                return <h5 className={className}>{children}</h5>;
              case 6:
                return <h6 className={className}>{children}</h6>;
              default:
                return <p className={className}>{children}</p>;
            }
          },
        }}
      />
    </div>
  );
}
