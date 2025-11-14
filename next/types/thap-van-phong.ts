import { BlocksContent } from '@strapi/blocks-react-renderer';

/**
 * Type definition for Thap Van Phong (Office Tower) from Strapi
 */
export interface ThapVanPhong {
  id: number;
  documentId: string;
  description: BlocksContent;
  image: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
    url: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
