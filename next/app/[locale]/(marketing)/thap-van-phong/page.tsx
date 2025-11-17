import Image from 'next/image';
import { Header } from '@/components/header';
import { fetchThapVanPhong } from '@/lib/strapi/fetchThapVanPhong';
import { ThapVanPhongContent } from '@/components/thap-van-phong/content';
import { strapiImage } from '@/lib/strapi/strapiImage';
import type { ThapVanPhong } from '@/types/thap-van-phong';

export default async function ThapVanPhongPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVietnamese = locale === 'vi';

  // Fetch data from Strapi with locale
  const data = await fetchThapVanPhong(locale);
  const thapVanPhong = data as ThapVanPhong | null;

  // Fallback if no data
  if (!thapVanPhong) {
    return (
      <main className="w-full min-h-screen bg-white pt-[84px]">
        <Header locale={locale} />
        <section className="container mx-auto px-4 py-16">
          <p className="text-gray-500 text-center">
            {isVietnamese ? 'Không tìm thấy dữ liệu' : 'No data found'}
          </p>
        </section>
      </main>
    );
  }

  const imageUrl = thapVanPhong.image?.url 
    ? strapiImage(thapVanPhong.image.url)
    : null;

  return (
    <main className="w-full min-h-screen bg-white pt-[84px]">
      <Header locale={locale} />

      <section className="office office_full section_border py-16 border-t border-gray-100 relative">
        <div className="container mx-auto px-4 pt-12 md:pt-16">
          {/* Title */}
          <div className="title_page absolute left-1/2 top-6 md:top-8 transform -translate-x-1/2 z-40 backdrop-blur-sm px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-md text-center text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase w-auto">
            {isVietnamese ? 'Tháp văn phòng' : 'Office Tower'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left - Image from Strapi */}
            <div className="md:col-span-6">
              <div className="zoom-img overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={thapVanPhong.image.alternativeText || (isVietnamese ? 'Tháp văn phòng IPH' : 'IPH Office Tower')}
                    width={thapVanPhong.image.width}
                    height={thapVanPhong.image.height}
                    className="w-full h-auto object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-gray-200 flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
              </div>
            </div>

            {/* Right - Content from Strapi */}
            <div className="md:col-span-5 md:col-start-8 mt-4 md:mt-6">
              <div className="office_content relative">
                {/* Divider line */}
                <div className="w-36 h-0.5 bg-gray-300 mb-6 rounded-full"></div>
                
                {/* Render Strapi Blocks content */}
                <ThapVanPhongContent content={thapVanPhong.description} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
