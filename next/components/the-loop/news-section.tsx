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
      className="relative py-10 md:py-16 bg-gray-50"
      style={{
        backgroundImage: 'url("https://loop.com.vn/assets/images/bg-1.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'left 10%'
      }}
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="relative flex items-center justify-center mb-8 md:mb-12">
          <div className="text-center">
            <span className="inline-block">
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 uppercase tracking-wide">
                TIN TỨC NỔI BẬT
              </span>
            </span>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {MOCK_NEWS.map((news) => (
            <div key={news.id} className="group" style={{ height: '600px' }}>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                {/* Image */}
                <Link 
                  href={`/events/${news.slug}`}
                  className="block relative overflow-hidden"
                  style={{ height: '250px' }}
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
                  {/* Title */}
                  <h4 className="mb-3 flex-grow">
                    <Link 
                      href={`/events/${news.slug}`}
                      className="text-lg md:text-xl font-bold text-gray-900 uppercase leading-tight hover:text-pink-600 transition-colors duration-200 line-clamp-3"
                    >
                      {news.title}
                    </Link>
                  </h4>

                  {/* Date */}
                  <div className="text-sm text-gray-500 mb-4 flex-shrink-0">
                    {news.date}
                  </div>

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
