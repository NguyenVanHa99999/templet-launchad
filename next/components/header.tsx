'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const isVietnamese = locale === 'vi';
  const alternateLocale = isVietnamese ? 'en' : 'vi';
  const alternateLang = isVietnamese ? 'ENGLISH' : 'VIETNAM';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white py-[5px]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          
          {/* Logo - Responsive: mobile 32px -> desktop 74px max */}
          <div className="relative flex-shrink-0 px-[15px]">
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
                className="h-[32px] w-auto sm:h-[36px] md:h-[45px] lg:h-[52px] xl:h-[74px] max-h-[74px] object-contain"
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
              href={`/${alternateLocale}`}
              className="flex items-center gap-1 font-medium text-black hover:text-[#cd5766] transition-all duration-[400ms] ease-in-out"
            >
              <span className="hidden sm:inline">{alternateLang}</span>
              <span className="sm:hidden">{isVietnamese ? 'EN' : 'VI'}</span>
              
              <Image
                src={isVietnamese ? '/images/flags/uk.png' : '/images/flags/vietnam.png'}
                alt={alternateLang}
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
