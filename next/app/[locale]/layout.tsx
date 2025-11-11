import { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { draftMode } from 'next/headers';
import React from 'react';

import { DraftModeBanner } from '@/components/draft-mode-banner';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Header } from '@/components/header';
import { AIToast } from '@/components/toast';
import { CartProvider } from '@/context/cart-context';
import { generateMetadataObject } from '@/lib/shared/metadata';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { cn } from '@/lib/utils';

// Default Global SEO for pages without them
export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const pageData = await fetchContentType(
    'global',
    {
      filters: { locale: params.locale },
      populate: 'seo.metaImage',
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  const { isEnabled: isDraftMode } = await draftMode();

  const pageData = await fetchContentType(
    'global',
    { filters: { locale } },
    true
  );
  return (
    <ViewTransitions>
      <CartProvider>
        <div className="bg-white antialiased h-full w-full">
          {/* IPH Header - Logo and language switcher */}
          <Header locale={locale} />
          
          {/* Main content */}
          {children}
          
          {isDraftMode && <DraftModeBanner />}
        </div>
      </CartProvider>
    </ViewTransitions>
  );
}
