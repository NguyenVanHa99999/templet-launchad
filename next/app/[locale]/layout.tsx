import { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { draftMode } from 'next/headers';

import { DraftModeBanner } from '@/components/draft-mode-banner';
import { CartProvider } from '@/context/cart-context';
import { generateMetadataObject } from '@/lib/shared/metadata';
import fetchContentType from '@/lib/strapi/fetchContentType';

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

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { children } = props;

  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <ViewTransitions>
      <CartProvider>
        <div className="bg-white antialiased h-full w-full" suppressHydrationWarning>
          {/* Main content */}
          {children}
          
          {isDraftMode && <DraftModeBanner />}
        </div>
      </CartProvider>
    </ViewTransitions>
  );
}
