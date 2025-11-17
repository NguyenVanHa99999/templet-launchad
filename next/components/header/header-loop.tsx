'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  return (
    <header className="w-full bg-white">
      {/* Header Top */}
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Empty space for symmetry */}
            <span className="flex-1"></span>
            
            {/* Logo Center */}
            <Link href={`/${locale}/the-loop`} className="flex-shrink-0">
              <Image
                src="/images/logo-homepage-TTTM.png"
                alt="THE LOOP"
                width={230}
                height={78}
                className="h-auto w-[130px] md:w-[150px] lg:w-[195px]"
                priority
                unoptimized
              />
            </Link>

            {/* Right Side */}
            <div className="flex-1 flex items-center justify-end gap-3 md:gap-4">
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
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-3 transition-colors rounded-full md:rounded-none bg-[#e1e1e1] hover:bg-[#d0d0d0] shadow-none"
                  aria-label="Search"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {searchOpen && (
                  <>
                    {/* Overlay để close khi click bên ngoài */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setSearchOpen(false)}
                    ></div>
                    <div className="absolute right-0 top-full mt-3 w-full md:w-[315px] bg-white shadow-lg rounded p-3 z-50 border border-gray-300 before:content-[''] before:absolute before:top-[-9px] before:right-[2px] before:w-0 before:h-0 before:border-l-[9px] before:border-l-transparent before:border-r-[9px] before:border-r-transparent before:border-b-[9px] before:border-b-white">
                      <form className="relative flex items-center bg-[#e1e1e1] px-4 py-2.5" action={`/${locale}/the-loop/search`} method="get">
                        <input
                          type="text"
                          name="q"
                          placeholder="Search"
                          className="w-full bg-transparent focus:outline-none text-base pr-10 text-black placeholder:text-black placeholder:font-medium border-0 outline-none ring-0 focus:ring-0"
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
                  </>
                )}
              </div>

              {/* Hamburger Menu */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded transition-colors"
                aria-label="Menu"
              >
                <div className="flex flex-col gap-1.5">
                  <span className={`block w-6 h-0.5 bg-black transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-black transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-black transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Header Main - Navigation */}
      <section className="relative border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left Navigation */}
            <ul className="flex items-center">
              <li>
                <Link
                  href={`/${locale}/the-loop`}
                  className={`block py-4 px-4 transition-colors font-bold uppercase text-sm tracking-wide ${
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
                  className={`block py-4 px-4 transition-colors font-bold uppercase text-sm tracking-wide ${
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
                  className={`block py-4 px-4 transition-colors font-bold uppercase text-sm tracking-wide ${
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
                  className={`block py-4 px-4 transition-colors font-bold uppercase text-sm tracking-wide ${
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
                  className={`block py-4 px-4 transition-colors font-bold uppercase text-sm tracking-wide ${
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
            className="absolute left-0 right-0 top-full bg-white shadow-lg z-50 border-t border-gray-200"
            onMouseEnter={() => setShopsHover(true)}
            onMouseLeave={() => setShopsHover(false)}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-7">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Categories */}
                    <div>
                      <h4 className="text-xl font-bold mb-5">
                        {isVietnamese ? 'Danh sách' : 'Categories'}
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <Link href={`/${locale}/the-loop/shop-category/fashion`} className="hover:text-gray-600 transition-colors">
                            {isVietnamese ? 'Thời trang & Làm đẹp' : 'Fashion & Beauty'}
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shop-category/entertainment`} className="hover:text-gray-600 transition-colors">
                            {isVietnamese ? 'Dịch vụ & Giải trí' : 'Services & Entertainment'}
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shop-category/supermarket`} className="hover:text-gray-600 transition-colors">
                            {isVietnamese ? 'Siêu thị & Cửa Hàng Chuyên Dụng' : 'Supermarket & Specialty Stores'}
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Featured Brands */}
                    <div>
                      <h4 className="text-xl font-bold mb-5">
                        {isVietnamese ? 'Thương hiệu nổi bật' : 'Featured Brands'}
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <Link href={`/${locale}/the-loop/shops/ohsome`} className="hover:text-gray-600 transition-colors font-medium">
                            OH!SOME
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shops/abc-mart`} className="hover:text-gray-600 transition-colors font-medium">
                            ABC MART
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shops/matsukiyo`} className="hover:text-gray-600 transition-colors font-medium">
                            MATSUKIYO
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shops/timezone`} className="hover:text-gray-600 transition-colors font-medium">
                            TIMEZONE
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Shop */}
                <div className="col-span-4 col-start-9">
                  <Link href={`/${locale}/the-loop/shops/ohsome`} className="block group">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src="/images/shop-ohsome.jpg"
                        alt="OH!SOME"
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover transition-transform group-hover:scale-110"
                        unoptimized
                      />
                    </div>
                    <h4 className="mt-5 font-bold text-lg uppercase">OH!SOME</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      {isVietnamese 
                        ? 'Thứ Hai - Thứ Sáu: 10:00 - 22:00\nThứ Bảy, Chủ Nhật, Ngày Lễ: 9:30 - 22:00'
                        : 'Mon - Fri: 10:00 - 22:00\nSat, Sun, Holidays: 9:30 - 22:00'
                      }
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mega Menu - Dining */}
        {dinesHover && (
          <div
            className="absolute left-0 right-0 top-full bg-white shadow-lg z-50 border-t border-gray-200"
            onMouseEnter={() => setDinesHover(true)}
            onMouseLeave={() => setDinesHover(false)}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-7">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Categories */}
                    <div>
                      <h4 className="text-xl font-bold mb-5">
                        {isVietnamese ? 'Danh sách' : 'Categories'}
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <Link href={`/${locale}/the-loop/shop-category/cafe`} className="hover:text-gray-600 transition-colors">
                            {isVietnamese ? 'Cafe & Đồ uống' : 'Cafe & Beverages'}
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Featured Brands */}
                    <div>
                      <h4 className="text-xl font-bold mb-5">
                        {isVietnamese ? 'Thương hiệu nổi bật' : 'Featured Brands'}
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <Link href={`/${locale}/the-loop/shops/gangnam-box`} className="hover:text-gray-600 transition-colors font-medium">
                            GANGNAM BOX
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shops/isushi`} className="hover:text-gray-600 transition-colors font-medium">
                            ISUSHI
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shops/dookki`} className="hover:text-gray-600 transition-colors font-medium">
                            DOOKKI
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${locale}/the-loop/shops/meiwei`} className="hover:text-gray-600 transition-colors font-medium">
                            MEIWEI
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Restaurant */}
                <div className="col-span-4 col-start-9">
                  <Link href={`/${locale}/the-loop/shops/tomita`} className="block group">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src="/images/restaurant-tomita.jpg"
                        alt="TOMITA"
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover transition-transform group-hover:scale-110"
                        unoptimized
                      />
                    </div>
                    <h4 className="mt-5 font-bold text-lg uppercase">JAPANESE RAMEN TOMITA HANOI</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      {isVietnamese ? 'Sắp Ra Mắt' : 'Coming Soon'}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMenuOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 text-3xl leading-none"
              >
                ×
              </button>
              
              <nav className="mt-12">
                <ul className="space-y-1">
                  <li>
                    <Link href={`/${locale}/the-loop`} className="block py-3 px-4 hover:bg-gray-100 rounded font-medium">
                      {isVietnamese ? 'Trang chủ' : 'Home'}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/the-loop/shops`} className="block py-3 px-4 hover:bg-gray-100 rounded font-medium">
                      {isVietnamese ? 'Mua sắm' : 'Shop'}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/the-loop/dines`} className="block py-3 px-4 hover:bg-gray-100 rounded font-medium">
                      {isVietnamese ? 'Ẩm thực' : 'Dining'}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/the-loop/events`} className="block py-3 px-4 hover:bg-gray-100 rounded font-medium">
                      {isVietnamese ? 'Sự kiện & Ưu đãi' : 'Events & Offers'}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/the-loop/services`} className="block py-3 px-4 hover:bg-gray-100 rounded font-medium">
                      {isVietnamese ? 'Dịch vụ' : 'Services'}
                    </Link>
                  </li>
                  <li className="pt-4 border-t mt-4">
                    <Link href={`/${locale}/thap-van-phong`} className="block py-3 px-4 hover:bg-gray-100 rounded font-bold">
                      {isVietnamese ? 'THÁP VĂN PHÒNG' : 'OFFICE TOWER'}
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
