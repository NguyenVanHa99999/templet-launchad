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
          {/* Horizontal column - nhỏ nằm ngang */}
          <div className="w-full h-20 flex items-end justify-center pb-2">
            <h2 className="text-3xl font-medium uppercase text-center text-black leading-none">
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