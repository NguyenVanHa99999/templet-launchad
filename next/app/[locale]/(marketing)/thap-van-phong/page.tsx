import { Header } from '@/components/header';

export default async function ThapVanPhongPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVietnamese = locale === 'vi';

  return (
    <main className="w-full min-h-screen">
      {/* Header */}
      <Header locale={locale} />

      {/* Body - Full width column with 4 corner coverage */}
      <div className="w-full h-[calc(100vh-84px)] pt-[84px] flex flex-col">
        <div className="flex-1 w-full bg-white flex flex-col">
          {/* Horizontal column - nhỏ nằm ngang - Responsive container */}
          <div className="w-full h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 flex items-center justify-center px-4 py-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold uppercase text-center text-black leading-tight">
              {isVietnamese ? 'Tháp văn phòng' : 'Office Tower'}
            </h2>
          </div>       
          
          {/* Large column - fill hết khoảng dưới */}
          <div className="flex-1 w-full bg-blue-50">
            {/* Content sẽ phát triển thêm sau */}
          </div>
        </div>
      </div>
    </main>
  );
}