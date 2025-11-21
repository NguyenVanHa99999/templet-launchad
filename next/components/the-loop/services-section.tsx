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
        <div key={service.id} className="relative w-full sm:w-full md:flex-1 lg:flex-1 group h-[180px] sm:h-[200px] md:h-[220px] lg:h-[260px] xl:h-[300px] 2xl:h-[320px]" suppressHydrationWarning>
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
                      width={36}
                      height={36}
                      className="mx-auto sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16"
                      unoptimized
                    />
                  </p>
                  <h4 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-black uppercase tracking-wide hover:underline cursor-pointer transition-all duration-200 px-3 sm:px-4 md:px-4 lg:px-6">
                    {service.title}
                  </h4>
                </>
              ) : (
                <div 
                  className="px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 2xl:px-12 2xl:py-6 transition-colors duration-300" 
                  style={{ backgroundColor: '#3b352b' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f16178'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b352b'}
                >
                  <span className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-black uppercase tracking-wide text-white cursor-pointer">
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
