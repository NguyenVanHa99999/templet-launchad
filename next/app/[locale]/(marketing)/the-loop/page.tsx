import { Header } from '@/components/header';

export default async function TheLoopPage({
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

      {/* Content placeholder - Sẽ phát triển thêm sau */}
      <div className="pt-24 px-4 container mx-auto">
        <h1 className="text-4xl font-bold">
          {isVietnamese ? 'Trung tâm Thương mại THE LOOP' : 'THE LOOP Shopping Mall'}
        </h1>
      </div>
    </main>
  );
}