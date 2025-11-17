import { Metadata } from 'next';

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

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Trang trắng - chưa có nội dung */}
    </main>
  );
}
