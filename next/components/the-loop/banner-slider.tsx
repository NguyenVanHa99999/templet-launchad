'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { strapiImage } from '@/lib/strapi/strapiImage';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

interface BannerData {
  id: number;
  title: string;
  image: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  alt: string;
  order: number;
}

interface BannerSliderProps {
  banners: BannerData[];
}

export function BannerSlider({ banners }: BannerSliderProps) {
  // Fallback to empty array if no banners
  if (!banners || banners.length === 0) {
    return null;
  }
  return (
    <section className="banner relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
      <Swiper
        modules={[Autoplay]}
        effect="slide"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        spaceBetween={0}
        className="w-full h-full [&_.swiper-slide]:cursor-default"
        slidesPerView={1}
        allowTouchMove={true}
        simulateTouch={true}
      >
        {banners.map((banner, index) => {
          const imageUrl = strapiImage(banner.image.url);
          const altText = banner.alt || banner.image.alternativeText || banner.title;

          return (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full">
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
