import { Metadata } from 'next';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  return {
    title: 'IPH - Indochina Plaza Hanoi',
    description: 'Welcome to IPH - Premium office and commercial space in Hanoi',
  };
}

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const isVietnamese = locale === 'vi';

  return (
    <main className="w-full h-screen overflow-hidden pt-[55px] md:pt-[60px] xl:pt-[84px] transition-all duration-300 ease-in-out">
      {/* Hero Section - 2 columns full height, no scroll */}
      <div className="flex flex-col lg:flex-row h-full transition-all duration-500 ease-in-out">
        
        {/* Left Column - Tháp văn phòng */}
        <div className="relative w-full lg:flex-[0_0_50%] lg:max-w-[50%] h-1/2 lg:h-full overflow-hidden group cursor-pointer transition-all duration-700 ease-in-out">
          <img 
            src="/images/thap-van-phong.jpg" 
            alt={isVietnamese ? "Tháp văn phòng IPH" : "IPH Office Tower"}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110"
          />
          <a 
            href={`/${locale}/thap-van-phong`} 
            className="absolute inset-0 z-10 flex items-center justify-center text-white text-[40px] xl:text-[40px] leading-tight transition-all duration-500 ease-in-out group-hover:text-[#e06b7a] text-center max-xl:text-[24px]"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)'
            }}
          >
            <span>
              <strong className="font-bold">
                {isVietnamese ? "Tháp văn phòng" : "Office Tower"}
              </strong>
              <br />
              <strong className="font-bold">IPH</strong>
            </span>
          </a>
        </div>

        {/* Right Column - THE LOOP */}
        <div className="relative w-full lg:flex-[0_0_50%] lg:max-w-[50%] h-1/2 lg:h-full overflow-hidden group cursor-pointer transition-all duration-700 ease-in-out">
          <img 
            src="/images/anh-tttm.jpg" 
            alt={isVietnamese ? "Trung tâm thương mại THE LOOP" : "THE LOOP Shopping Mall"}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110"
          />
          <a 
            href={`/${locale}/the-loop`} 
            className="absolute inset-0 z-10 flex items-center justify-center text-white text-[40px] xl:text-[40px] leading-tight transition-all duration-500 ease-in-out group-hover:text-[#e06b7a] text-center max-xl:text-[24px]"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)'
            }}
          >
            <span>
              <strong className="font-bold">
                {isVietnamese ? "Trung tâm Thương mại" : "Shopping Mall"}
              </strong>
              <br />
              <strong className="font-bold">THE LOOP</strong>
            </span>
          </a>
        </div>

      </div>
    </main>
  );
}
