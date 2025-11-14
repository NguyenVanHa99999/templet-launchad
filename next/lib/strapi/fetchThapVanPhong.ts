import fetchContentType, { spreadStrapiData } from './fetchContentType';

/**
 * Fetches Thap Van Phong (Office Tower) data from Strapi
 * @param locale - Language locale (vi, en)
 * @returns Promise with the first thap-van-phong entry including image
 */
export async function fetchThapVanPhong(locale: string = 'vi') {
  try {
    // Try to fetch with requested locale
    let data = await fetchContentType('thap-van-phongs', {
      populate: '*',
      locale,
    });

    // If no data found and locale is 'vi', fallback to 'en'
    if (!data?.data || (Array.isArray(data.data) && data.data.length === 0)) {
      if (locale === 'vi') {
        console.log('No Vietnamese content found, falling back to English');
        data = await fetchContentType('thap-van-phongs', {
          populate: '*',
          locale: 'en',
        });
      }
    }

    // Spread to get first entry
    return spreadStrapiData(data);
  } catch (error) {
    console.error('Error fetching Thap Van Phong:', error);
    return null;
  }
}
