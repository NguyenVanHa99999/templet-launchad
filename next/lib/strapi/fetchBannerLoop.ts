import fetchContentType from './fetchContentType';

/**
 * Fetches Banner Loop data from Strapi
 * Sorted by order field, filtered by is_active status
 * @returns Promise with array of active banner entries including images
 */
export async function fetchBannerLoop() {
  try {
    const data = await fetchContentType('banner-loops', {
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'width', 'height'],
        },
      },
      filters: {
        is_active: {
          $eq: true,
        },
      },
      sort: ['order:asc'],
    });

    return data?.data || [];
  } catch (error) {
    console.error('Error fetching Banner Loop:', error);
    return [];
  }
}
