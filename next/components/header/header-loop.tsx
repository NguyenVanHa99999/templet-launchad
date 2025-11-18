'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';

interface HeaderLoopProps {
  locale: string;
}

export function HeaderLoop({ locale }: HeaderLoopProps) {
  const pathname = usePathname();
  const isVietnamese = locale === 'vi';
  
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopsHover, setShopsHover] = useState(false);
  const [dinesHover, setDinesHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let lastScrollY = 0;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Chỉ update nếu scroll đủ xa khỏi ngưỡng
      if (scrollY > 100 && !scrolled) {
        setScrolled(true);
      } else if (scrollY < 30 && scrolled) {
        setScrolled(false);
      }
      
      lastScrollY = scrollY;
    };
    
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };
    
    window.addEventListener('scroll', debouncedScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(timeoutId);
    };
  }, [scrolled]);

  return (
    <header className={`w-full bg-white sticky top-0 z-50 shadow-sm transition-all duration-300 ${scrolled ? '' : 'min-h-[180px]'}`}>
      {/* Header Top */}
      <section className={`transition-all duration-300 overflow-hidden ${scrolled ? 'max-h-0 opacity-0' : 'max-h-[200px] opacity-100'}`}>
        <div className="container mx-auto px-4 pt-6">
          <div className="flex items-center justify-between md:justify-center py-3 md:py-4 relative">
            {/* Logo - Left on mobile, Center on desktop */}
            <Link href={`/${locale}/the-loop`} className="flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
              <Image
                src="/images/logo-homepage-TTTM.png"
                alt="THE LOOP"
                width={230}
                height={78}
                className="h-auto w-[140px] md:w-[194px]"
                priority
                unoptimized
              />
            </Link>

            {/* Right Side - Always on right */}
            <div className="flex items-center justify-end gap-3 md:gap-4 ml-auto">
              {/* Language Switcher */}
              <div className="flex items-center gap-2">
                <Link 
                  href={`/vi/the-loop`}
                  className={`text-base md:text-lg transition-colors ${locale === 'vi' ? 'font-bold text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  VN
                </Link>
                <Link
                  href={`/en/the-loop`}
                  className={`text-base md:text-lg transition-colors ${locale === 'en' ? 'font-bold text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  EN
                </Link>
              </div>

              {/* Search */}
              <div className="relative">
                <button
                  ref={searchButtonRef}
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-3 transition-colors rounded-full md:rounded-none bg-[#e1e1e1] hover:bg-[#d0d0d0] shadow-none"
                  aria-label="Search"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {searchOpen && mounted && searchButtonRef.current && createPortal(
                  <>
                    {/* Overlay để close khi click bên ngoài */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setSearchOpen(false)}
                    ></div>
                    <div 
                      className="fixed w-[300px] max-w-[calc(100vw-2rem)] bg-white shadow-lg rounded-md p-2.5 z-[100] border border-gray-300"
                      style={{
                        top: `${searchButtonRef.current.getBoundingClientRect().bottom + 12}px`,
                        right: `${window.innerWidth - searchButtonRef.current.getBoundingClientRect().right}px`
                      }}
                    >
                      <form className="relative flex items-center bg-[#e1e1e1] h-[48px]" action={`/${locale}/the-loop/search`} method="get">
                        <input
                          type="text"
                          name="q"
                          placeholder="Search"
                          className="w-full h-full bg-transparent focus:outline-none text-base px-4 pr-12 text-black placeholder:text-black placeholder:font-bold border-0 outline-none ring-0 focus:ring-0 leading-6"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="absolute right-4 p-0 hover:opacity-70 transition-opacity"
                        >
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                      </form>
                    </div>
                  </>,
                  document.body
                )}
              </div>

              {/* Hamburger Menu */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-3 transition-colors hover:opacity-70 flex items-center justify-center"
                aria-label="Menu"
              >
                <span className="mburger inline-flex flex-col gap-[5px] w-6">
                  <b className={`block h-[2px] w-full bg-black transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></b>
                  <b className={`block h-[2px] w-full bg-black transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0 scale-0' : ''}`}></b>
                  <b className={`block h-[2px] w-full bg-black transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></b>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Header Main - Navigation */}
      <section className="relative hidden md:block py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left Navigation */}
            <ul className="flex items-center">
              <li>
                <Link
                  href={`/${locale}/the-loop`}
                  className={`block py-5 px-4 transition-colors font-bold uppercase text-base tracking-wide ${
                    pathname === `/${locale}/the-loop` 
                      ? 'text-red-600' 
                      : 'text-black hover:text-red-600'
                  }`}
                >
                  {isVietnamese ? 'Trang chủ' : 'Home'}
                </Link>
              </li>
              <li
                onMouseEnter={() => setShopsHover(true)}
                onMouseLeave={() => setShopsHover(false)}
              >
                <Link
                  href={`/${locale}/the-loop/shops`}
                  className={`block py-5 px-4 transition-colors font-bold uppercase text-base tracking-wide ${
                    pathname.includes('/the-loop/shops') 
                      ? 'text-red-600' 
                      : 'text-black hover:text-red-600'
                  }`}
                >
                  {isVietnamese ? 'Mua sắm' : 'Shop'}
                </Link>
              </li>
              <li
                onMouseEnter={() => setDinesHover(true)}
                onMouseLeave={() => setDinesHover(false)}
              >
                <Link
                  href={`/${locale}/the-loop/dines`}
                  className={`block py-5 px-4 transition-colors font-bold uppercase text-base tracking-wide ${
                    pathname.includes('/the-loop/dines') 
                      ? 'text-red-600' 
                      : 'text-black hover:text-red-600'
                  }`}
                >
                  {isVietnamese ? 'Ẩm thực' : 'Dine'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/the-loop/events`}
                  className={`block py-5 px-4 transition-colors font-bold uppercase text-base tracking-wide ${
                    pathname.includes('/the-loop/events') 
                      ? 'text-red-600' 
                      : 'text-black hover:text-red-600'
                  }`}
                >
                  {isVietnamese ? 'Sự kiện & Ưu đãi' : 'Events & Promotions'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/the-loop/services`}
                  className={`block py-5 px-4 transition-colors font-bold uppercase text-base tracking-wide ${
                    pathname.includes('/the-loop/services') 
                      ? 'text-red-600' 
                      : 'text-black hover:text-red-600'
                  }`}
                >
                  {isVietnamese ? 'Dịch vụ' : 'Services'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mega Menu - Shopping */}
        {shopsHover && (
          <div
            className="absolute left-0 right-0 top-full bg-[#f2f2f2] z-[60] border-t border-gray-200 transition-all duration-300 ease-out"
            style={{animation: 'slideDown 0.3s ease-out'}}
            onMouseEnter={() => setShopsHover(true)}
            onMouseLeave={() => setShopsHover(false)}
          >
            <div className="container mx-auto px-4 pt-12 pb-24 min-h-[500px]">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-7">
                  <div className="flex gap-8 pl-4">
                    {/* Categories */}
                    <div>
                      <h4 className="text-xl font-bold mb-5 text-black">
                        {isVietnamese ? 'Danh sách' : 'Categories'}
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <Link href={`/${locale}/the-loop/shop-category/fashion`} className="text-black hover:text-red-600 transition-colors">
                            {isVietnamese ? 'Thời trang & Làm đẹp' : 'Fashion & Beauty'}
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shop-category/entertainment`} className="text-black hover:text-red-600 transition-colors">
                            {isVietnamese ? 'Dịch vụ & Giải trí' : 'Services & Entertainment'}
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shop-category/supermarket`} className="text-black hover:text-red-600 transition-colors block">
                            {isVietnamese ? (
                              <>
                                Siêu thị & Cửa Hàng<br/>Chuyên Dụng
                              </>
                            ) : (
                              <>
                                Supermarket &<br/>Specialty Stores
                              </>
                            )}
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Featured Brands */}
                    <div>
                      <h4 className="text-xl font-bold mb-5 text-black">
                        {isVietnamese ? 'Thương hiệu nổi bật' : 'Featured Brands'}
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <Link href={`/${locale}/the-loop/shops/ohsome`} className="text-black hover:text-red-600 transition-colors font-medium">
                            OH!SOME
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shops/abc-mart`} className="text-black hover:text-red-600 transition-colors font-medium">
                            ABC MART
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shops/matsukiyo`} className="text-black hover:text-red-600 transition-colors font-medium">
                            MATSUKIYO
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Shop */}
                <div className="col-span-4 col-start-9">
                  <Link href={`/${locale}/the-loop/shops/ohsome`} className="block group mt-8">
                    <div className="overflow-hidden">
                      <Image
                        src="/images/ohsome-2-web1.jpg"
                        alt="OH!SOME"
                        width={300}
                        height={200}
                        className="w-full max-w-[350px] aspect-[7/4] object-cover transition-transform group-hover:scale-110"
                        unoptimized
                      />
                    </div>
                    <div className="w-full max-w-[350px]">
                      <h4 className="mt-5 font-bold text-lg uppercase text-black">OH!SOME</h4>
                      <p className="text-sm text-gray-600 mt-2">
                      {isVietnamese 
                        ? 'Thứ Hai - Thứ Sáu: 10:00 - 22:00\nThứ Bảy, Chủ Nhật, Ngày Lễ: 9:30 - 22:00'
                        : 'Mon - Fri: 10:00 - 22:00\nSat, Sun, Holidays: 9:30 - 22:00'
                      }
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mega Menu - Dining */}
        {dinesHover && (
          <div
            className="absolute left-0 right-0 top-full bg-[#f2f2f2] z-[60] border-t border-gray-200 transition-all duration-300 ease-out"
            style={{animation: 'slideDown 0.3s ease-out'}}
            onMouseEnter={() => setDinesHover(true)}
            onMouseLeave={() => setDinesHover(false)}
          >
            <div className="container mx-auto px-4 pt-12 pb-24 min-h-[500px]">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-7">
                  <div className="flex gap-8 pl-4">
                    {/* Categories */}
                    <div>
                      <h4 className="text-xl font-bold mb-5 text-black">
                        {isVietnamese ? 'Danh sách' : 'Categories'}
                      </h4>
                      <ul className="space-y-3">
                       
                      </ul>
                    </div>

                    {/* Featured Brands */}
                    <div>
                      <h4 className="text-xl font-bold mb-5 text-black">
                        {isVietnamese ? 'Thương hiệu nổi bật' : 'Featured Brands'}
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <Link href={`/${locale}/the-loop/shops/gangnam-box`} className="text-black hover:text-red-600 transition-colors font-medium">
                            GANGNAM BOX
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shops/isushi`} className="text-black hover:text-red-600 transition-colors font-medium">
                            ISUSHI
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shops/dookki`} className="text-black hover:text-red-600 transition-colors font-medium">
                            DOOKKI
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shops/meiwei`} className="text-black hover:text-red-600 transition-colors font-medium">
                            MEIWEI
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Restaurant */}
                <div className="col-span-4 col-start-9">
                  <Link href={`/${locale}/the-loop/shops/tomita`} className="block group mt-8">
                    <div className="overflow-hidden">
                      <Image
                        src="/images/tomita-small.jpg"
                        alt="TOMITA"
                        width={300}
                        height={200}
                        className="w-full max-w-[350px] aspect-[7/4] object-cover transition-transform group-hover:scale-110"
                        unoptimized
                      />
                    </div>
                    <div className="w-full max-w-[350px]">
                      <h4 className="mt-5 font-bold text-lg uppercase text-black">JAPANESE RAMEN TOMITA HANOI</h4>
                      <p className="text-sm text-gray-600 mt-2">
                      {isVietnamese ? 'Sắp Ra Mắt' : 'Coming Soon'}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50" onClick={() => setMenuOpen(false)}>
          <div 
            className="absolute left-0 top-0 bottom-0 w-[80%] max-w-sm bg-[#e06b7a] overflow-y-auto transform transition-transform duration-300 ease-in-out" 
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideInLeft 0.3s ease-out' }}
          >
            <div className="p-6">
              {/* Title MENU */}
              <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-8 text-center">
                MENU
              </h2>
              
              <nav>
                <ul className="space-y-0">
                  <li className="border-b border-white/20">
                    <Link href={`/${locale}/the-loop`} className="block py-4 px-0 text-white hover:bg-white/10 transition-colors font-normal uppercase tracking-wide">
                      {isVietnamese ? 'Trang chủ' : 'Home'}
                    </Link>
                  </li>
                  <li className="border-b border-white/20">
                    <Link href={`/${locale}/the-loop/shops`} className="block py-4 px-0 text-white hover:bg-white/10 transition-colors font-normal uppercase tracking-wide">
                      {isVietnamese ? 'Mua sắm' : 'Shop'}
                    </Link>
                  </li>
                  <li className="border-b border-white/20">
                    <Link href={`/${locale}/the-loop/dines`} className="block py-4 px-0 text-white hover:bg-white/10 transition-colors font-normal uppercase tracking-wide">
                      {isVietnamese ? 'Ẩm thực' : 'Dine'}
                    </Link>
                  </li>
                  <li className="border-b border-white/20">
                    <Link href={`/${locale}/the-loop/events`} className="block py-4 px-0 text-white hover:bg-white/10 transition-colors font-normal uppercase tracking-wide">
                      {isVietnamese ? 'Sự kiện & Ưu đãi' : 'Events & Offers'}
                    </Link>
                  </li>
                  <li className="border-b border-white/20">
                    <Link href={`/${locale}/the-loop/services`} className="block py-4 px-0 text-white hover:bg-white/10 transition-colors font-normal uppercase tracking-wide">
                      {isVietnamese ? 'Dịch vụ' : 'Services'}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
