import Image from 'next/image';
import { Header } from '@/components/header';

export default async function ThapVanPhongPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVietnamese = locale === 'vi';

  return (
  <main className="w-full min-h-screen bg-white pt-[84px]">
      {/* Header */}
      <Header locale={locale} />

      {/* Section - converted from legacy HTML to Tailwind JSX */}
      <section className="office office_full section_border py-16 border-t border-gray-100 relative">
        <div className="container mx-auto px-4 pt-12 md:pt-16">
          {/* Title placed absolutely so it won't be pushed by other content; visually separated like a header */}
          <div className="title_page absolute left-1/2 top-6 md:top-8 transform -translate-x-1/2 z-40  backdrop-blur-sm px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-md text-center text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] max-w-7xl">
            {isVietnamese ? 'Tháp văn phòng' : 'Office Tower'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left - Image */}
            <div className="md:col-span-6">
              <div className="zoom-img overflow-hidden rounded ">
                <Image
                  src="https://iph.vn/storage/small-1.jpg"
                  alt={isVietnamese ? 'Tháp văn phòng IPH' : 'IPH Office Tower'}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Right - Content (offset-md-1 => start at col 8) */}
            <div className="md:col-span-5 md:col-start-8">
              <div className="office_content relative">
                {/* Divider line - decorative top border */}
                <div className="w-36 h-0.5 bg-gray-300 mb-6 rounded-full"></div>
                
                <div className="desc text-gray-800 leading-relaxed">
                  <p className="mb-4">
                    Dự án Indochina Plaza Hanoi (IPH) tọa lạc tại Cầu Giấy - khu vực đang phát triển mới với nhiều tòa tháp văn phòng và chung cư cao cấp, là điểm giao cắt giữa đường Vành đai 3 kết nối với Sân bay Nội Bài (40 phút lái xe) và đường Xuân Thủy kết nối với trung tâm thành phố Hà Nội (25 phút lái xe).
                  </p>

                  <p className="mb-4">
                    IPH là dự án phức hợp bao gồm tòa nhà văn phòng hạng A với 11 tầng, 386 căn hộ cao cấp và trung tâm thương mại hạng nhất với diện tích cho thuê hơn 18,000 m2. Khu Trung tâm thương mại vừa hoàn thành việc cải tạo, bao gồm 18 nhà hàng ăn uống và 02 siêu thị.
                  </p>

                  <p className="mb-4">Tòa tháp văn phòng IPH cung cấp khoảng 14,000 m2 diện tích cho thuê với các điều kiện thuê rất linh hoạt:</p>

                  <ul className="list-disc pl-5 mb-4 text-gray-800">
                    <li>Diện tích sàn: Khoảng 1,260 m2, có thể chia thành 08 diện tích nhỏ</li>
                    <li>Chiều cao trần : 2,7m</li>
                    <li>Thang máy : Gồm 04 thang máy tốc độ cao và 01 thang máy dịch vụ</li>
                    <li>Bãi đậu xe: 02 tầng hầm và 01 tầng lửng rộng rãi dùng làm bãi đậu xe ô tô và xe máy</li>
                    <li>Điều hòa : Hệ thống điều hòa trung tâm</li>
                    <li>Hệ thống chữa cháy: Hệ thống báo cháy được trang bị đầy đủ với vòi phun nước và đầu báo khói</li>
                    <li>An ninh: Giám sát camera 24/7 và kiểm soát ra vào bằng thẻ từ</li>
                  </ul>

                  <p className="font-semibold">Liên hệ thuê: <a className="text-primary-600" href="tel:+84932235855">+84 932 23 58 55</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}