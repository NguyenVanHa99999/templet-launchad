'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ServiceItem {
  id: number;
  title: string;
  icon?: string;
  image?: string;
  href: string;
  isExternal?: boolean;
  backgroundColor?: string;
}

const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: 'TIN TỨC GIAN HÀNG',
    icon: 'https://loop.com.vn/storage/icon-1.png',
    href: '/tenants',
    backgroundColor: '#f16178'
  },
  {
    id: 2,
    title: 'SƠ ĐỒ TẦNG',
    image: 'https://loop.com.vn/storage/floormap-anh-dai-dien-2.jpg',
    href: '/floor-maps'
  },
  {
    id: 3,
    title: 'THÔNG BÁO',
    icon: 'https://loop.com.vn/storage/icon-2.png',
    href: '/announcements',
    backgroundColor: '#1356d1'
  },
  {
    id: 4,
    title: 'TẠP CHÍ THÁNG',
    image: 'https://loop.com.vn/storage/demo-newsletter-photo.jpg',
    href: 'https://drive.google.com/file/d/1TNgcdLFBJ1Mae_Nr2hJdsgvGaGcCBR2c/view?usp=sharing',
    isExternal: true
  }
];

export function ServicesSection() {
  return (
    <section className="flex flex-col sm:flex-col md:flex-row lg:flex-row w-full gap-0 md:gap-0" suppressHydrationWarning>
      {MOCK_SERVICES.map((service) => (
        <div key={service.id} className="relative w-full sm:w-full md:flex-1 lg:flex-1 group h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[250px]" suppressHydrationWarning>
          <Link 
            href={service.href}
            target={service.isExternal ? '_blank' : undefined}
            rel={service.isExternal ? 'noopener noreferrer' : undefined}
            className="zoom zoom-img block relative w-full h-full overflow-hidden"
          >
            {/* Background Image or Empty Span */}
            <span className="block w-full h-full">
              {service.image && (
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  unoptimized
                />
              )}
            </span>
          </Link>
          
          {/* Absolute Overlay Content */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-all duration-300" 
            style={{ 
              backgroundColor: service.backgroundColor ? service.backgroundColor : 'rgba(0, 0, 0, 0.3)' 
            }}
            suppressHydrationWarning
          >
            <div className="text-center text-white" suppressHydrationWarning>
              {service.icon ? (
                <>
                  <p className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    <Image
                      src={service.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="mx-auto sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11"
                      unoptimized
                    />
                  </p>
                  <h4 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl font-black uppercase tracking-wide hover:underline cursor-pointer transition-all duration-200 px-3 sm:px-4 md:px-4 lg:px-6">
                    {service.title}
                  </h4>
                </>
              ) : (
                <div 
                  className="px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 lg:px-6 lg:py-3 xl:px-7 xl:py-3 2xl:px-8 2xl:py-4 transition-colors duration-300" 
                  style={{ backgroundColor: '#3b352b' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f16178'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b352b'}
                >
                  <span className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl font-black uppercase tracking-wide text-white cursor-pointer">
                    {service.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
