'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderMarketingProps {
  locale: string;
}

/**
 * Header Marketing - Header cho các trang marketing (homepage, blog, products, thap-van-phong)
 * - Logo IPH + Language Switcher
 * - Fixed position với background trắng
 * - Responsive height: 55px -> 84px
 */
export function HeaderMarketing({ locale }: HeaderMarketingProps) {
  const pathname = usePathname();
  const isVietnamese = locale === 'vi';
  const alternateLocale = isVietnamese ? 'en' : 'vi';
  
  // Lấy path hiện tại và thay locale
  const currentPath = pathname.replace(`/${locale}`, '');
  const alternatePath = `/${alternateLocale}${currentPath}`;
  
  // Hiển thị ngôn ngữ HIỆN TẠI (không phải ngôn ngữ sẽ chuyển đến)
  const currentLang = isVietnamese ? 'VIETNAM' : 'ENGLISH';
  const currentFlag = isVietnamese ? '/images/flags/vietnam.png' : '/images/flags/uk.png';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 sm:py-3 md:py-4">
          
          {/* Logo - Responsive: mobile 40px -> desktop 74px max */}
          <div className="relative flex-shrink-0 px-0 sm:px-[15px]">
            <Link 
              href={`/${locale}`} 
              title="IPH - Indochina Plaza Hanoi"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/logo-iph.png"
                alt="IPH Logo"
                width={102}
                height={45}
                className="h-[40px] w-auto sm:h-[45px] md:h-[50px] lg:h-[60px] xl:h-[74px] max-h-[74px] object-contain"
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Language Switcher - Responsive */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Globe icon - Material Symbols */}
            <span 
              className="material-symbols-outlined hidden sm:block text-[31px] text-[#404040]"
            >
              language
            </span>
            
            <Link
              href={alternatePath}
              className="flex items-center gap-1 font-medium text-black hover:text-[#cd5766] transition-all duration-[400ms] ease-in-out"
            >
              <span className="hidden sm:inline">{currentLang}</span>
              <span className="sm:hidden">{isVietnamese ? 'VI' : 'EN'}</span>
              
              <Image
                src={currentFlag}
                alt={currentLang}
                width={27}
                height={18}
                className="rounded-[3px] ml-[5px] w-[27px] h-auto"
                unoptimized
              />
            </Link>
          </div>
          
        </div>
      </div>
    </header>
  );
}
