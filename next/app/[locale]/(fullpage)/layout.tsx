import { ViewTransitions } from 'next-view-transitions';
import { HeaderLoop } from '@/components/header';

interface FullPageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function FullPageLayout({
  children,
  params,
}: FullPageLayoutProps) {
  const { locale } = await params;

  return (
    <ViewTransitions>
      <div className="bg-white antialiased h-full w-full" suppressHydrationWarning>
        {/* Header THE LOOP */}
        <HeaderLoop locale={locale} />
        
        {/* Main content */}
        {children}
      </div>
    </ViewTransitions>
  );
}
