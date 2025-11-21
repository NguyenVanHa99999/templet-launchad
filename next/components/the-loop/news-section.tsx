'use client';

import Image from 'next/image';
import Link from 'next/link';
// Using inline SVG instead of heroicons to avoid dependency

interface NewsItem {
  id: number;
  title: string;
  image: string;
  date: string;
  description: string;
  slug: string;
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'QUÀ DÀNH TẶNG RIÊNG NÀNG MỪNG NGÀY PHỤ NỮ VIỆT NAM 20.10',
    image: 'https://loop.com.vn/storage/ngayphunuvietnam.png',
    date: '27/10/2025',
    description: '',
    slug: 'qua-danh-tang-rieng-nang-mung-ngay-phu-nu-viet-nam-2010'
  },
  {
    id: 2,
    title: 'VUI TẾT ĐOÀN VIÊN – NHẬN LIỀN QUÀ TẶNG',
    image: 'https://loop.com.vn/storage/trungthu.png',
    date: '05/10/2025',
    description: '',
    slug: 'vui-tet-doan-vien-nhan-lien-qua-tang'
  },
  {
    id: 3,
    title: 'CHÀO NĂM HỌC MỚI BÙNG NỔ CÙNG NGÀY HỘI TỰU TRƯỜNG 2025!',
    image: 'https://loop.com.vn/storage/school-fest-2.png',
    date: '10/09/2025',
    description: '',
    slug: 'chao-nam-hoc-moi-bung-no-cung-ngay-hoi-tuu-truong-2025'
  },
  {
    id: 4,
    title: 'CUỘC THI VẼ TRANH "VIỆT NAM TÔI YÊU" CHÍNH THỨC KHỞI ĐỘNG',
    image: 'https://loop.com.vn/storage/drawing-contest-2025.png',
    date: '16/08/2025',
    description: '',
    slug: 'cuoc-thi-ve-tranh-viet-nam-toi-yeu-chinh-thuc-khoi-dong'
  }
];

export function NewsSection() {
  return (
    <section 
      className="relative py-10 md:py-16 bg-gray-50 bg-[url('https://loop.com.vn/assets/images/bg-1.png')] bg-no-repeat bg-auto bg-[position:left_1%] md:bg-[position:left_10%]"
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="relative flex items-center justify-center mb-8 md:mb-12">
          <div className="flex items-center w-full">
            {/* Left Line */}
            <div className="flex-1 h-px bg-black"></div>
            
            {/* Title */}
            <div className="px-0 md:px-4 lg:px-6">
              <div className="bg-black text-white flex items-center justify-center px-8 py-4 md:px-12 md:py-4 lg:px-20 lg:py-5">
                <span className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-black uppercase whitespace-nowrap" style={{ fontWeight: '900', textShadow: '2px 2px 0px rgba(0,0,0,0.7)', letterSpacing: '-0.01em', WebkitTextStroke: '0.5px rgba(255,255,255,0.3)', fontSize: '26px' }}>
                  <span className="md:scale-[1.4] md:inline-block">TIN TỨC NỔI BẬT</span>
                </span>
              </div>
            </div>
            
            {/* Right Line */}
            <div className="flex-1 h-px bg-black"></div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" suppressHydrationWarning>
          {MOCK_NEWS.map((news) => (
            <div key={news.id} className="group h-[600px]" suppressHydrationWarning>
              <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full flex flex-col" suppressHydrationWarning>
                {/* Image */}
                <Link 
                  href={`/events/${news.slug}`}
                  className="block relative overflow-hidden h-[250px]"
                >
                  <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  {/* Title with fixed height */}
                  <div className="h-24 md:h-28 mb-4">
                    <h4 className="h-20 md:h-24">
                      <Link 
                        href={`/events/${news.slug}`}
                        className="text-lg md:text-xl font-bold text-gray-900 uppercase leading-tight hover:text-pink-600 transition-colors duration-200 block overflow-hidden"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {news.title}
                      </Link>
                    </h4>
                    <div className="text-sm text-gray-500">
                      {news.date}
                    </div>
                  </div>
                  
                  {/* Spacer for CTA */}
                  <div className="flex-grow"></div>

                  {/* Description (empty in original) */}
                  {news.description && (
                    <div className="text-gray-600 mb-4 text-sm">
                      {news.description}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link 
                      href={`/events/${news.slug}`}
                      className="flex items-center justify-between text-pink-600 font-bold text-sm hover:text-pink-700 transition-colors duration-200 group/cta"
                    >
                      <span>TÌM HIỂU THÊM</span>
                      <svg 
                        className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
