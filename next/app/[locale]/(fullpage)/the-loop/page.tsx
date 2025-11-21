import { Metadata } from 'next';
import { BannerSlider, NewsSection, ServicesSection } from '@/components/the-loop';
import { fetchBannerLoop } from '@/lib/strapi/fetchBannerLoop';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const isVietnamese = locale === 'vi';

  return {
    title: isVietnamese ? 'THE LOOP - Trung tâm Thương mại' : 'THE LOOP - Shopping Mall',
    description: isVietnamese 
      ? 'Trung tâm thương mại THE LOOP tại Indochina Plaza Hanoi' 
      : 'THE LOOP Shopping Mall at Indochina Plaza Hanoi',
  };
}

export default async function TheLoopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVietnamese = locale === 'vi';

  // Fetch banners from Strapi
  const banners = await fetchBannerLoop();

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Hero Banner Slider */}
      <BannerSlider banners={banners} />

      {/* News Section */}
      <NewsSection />

      {/* Services Section */}
      <ServicesSection />

      {/* More sections will be added here */}
    </main>
  );
}
