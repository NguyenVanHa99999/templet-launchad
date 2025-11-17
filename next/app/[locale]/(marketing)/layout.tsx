import { Header } from '@/components/header';

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function MarketingLayout({
  children,
  params,
}: MarketingLayoutProps) {
  const { locale } = await params;

  return (
    <>
      {/* IPH Header - Logo and language switcher */}
      <Header locale={locale} />
      
      {/* Main content */}
      {children}
    </>
  );
}
