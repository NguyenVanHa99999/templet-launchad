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

  return (
    <main className="w-full h-screen overflow-hidden pt-[55px] md:pt-[60px] xl:pt-[84px]">
      {/* Hero Section - 2 columns full height, no scroll */}
      <div className="flex flex-col lg:flex-row h-full">
        
        {/* Left Column - Tháp văn phòng */}
        <div className="relative w-full lg:flex-[0_0_50%] lg:max-w-[50%] h-1/2 lg:h-full overflow-hidden group cursor-pointer">
          <img 
            src="/images/thap-van-phong.jpg" 
            alt="Tháp văn phòng IPH"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <a 
            href="/thap-van-phong" 
            className="absolute inset-0 z-10 flex items-center justify-center text-white text-[40px] xl:text-[40px] leading-tight transition-colors duration-300 group-hover:text-[#e06b7a] text-center max-xl:text-[24px]"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)'
            }}
          >
            <span>
              <span className="font-medium">Tháp văn phòng</span>
              <br />
              <strong className="font-bold">IPH</strong>
            </span>
          </a>
        </div>

        {/* Right Column - THE LOOP */}
        <div className="relative w-full lg:flex-[0_0_50%] lg:max-w-[50%] h-1/2 lg:h-full overflow-hidden group cursor-pointer">
          <img 
            src="/images/anh-tttm.jpg" 
            alt="Trung tâm thương mại THE LOOP"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <a 
            href="/the-loop" 
            className="absolute inset-0 z-10 flex items-center justify-center text-white text-[40px] xl:text-[40px] leading-tight transition-colors duration-300 group-hover:text-[#e06b7a] text-center max-xl:text-[24px]"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)'
            }}
          >
            <span>
              <span className="font-medium">Trung tâm Thương mại</span>
              <br />
              <strong className="font-bold">THE LOOP</strong>
            </span>
          </a>
        </div>

      </div>
    </main>
  );
}
