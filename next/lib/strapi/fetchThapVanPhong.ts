import fetchContentType, { spreadStrapiData } from './fetchContentType';

/**
 * Fetches Thap Van Phong (Office Tower) data from Strapi
 * @returns Promise with the first thap-van-phong entry including image
 */
export async function fetchThapVanPhong() {
  try {
    const data = await fetchContentType('thap-van-phongs', {
      populate: '*',
    });

    // Spread to get first entry (since we only have one office tower entry)
    return spreadStrapiData(data);
  } catch (error) {
    console.error('Error fetching Thap Van Phong:', error);
    return null;
  }
}
