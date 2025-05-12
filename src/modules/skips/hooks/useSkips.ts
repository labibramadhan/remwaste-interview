import { useQuery } from '@tanstack/react-query';
import { Skip } from '../../../types/skip';
import { API_URL } from '../../../config/env';

const skipsApiUrl = `${API_URL}/skips/by-location?postcode=NR32&area=Lowestoft`;

export function useSkips() {
  const getSkipImageUrl = (skipSize: string) => {
    return `/images/skips_optimized/${skipSize}-yarder-skip.webp`;
  };

  return useQuery({
    queryKey: ['skips'],
    queryFn: async () => {
      const res = await fetch(skipsApiUrl);

      if (!res.ok) throw new Error('Failed to fetch skips');
      const data = await res.json();

      const processedSkips = data.map((skip: Skip) => ({
        ...skip,
        original_price:
          skip.price_before_vat + (10 / 100) * skip.price_before_vat,
        image_url: getSkipImageUrl(skip.size.toString()),
        recommended: skip.size === 8,
        popular: skip.size === 6,
      }));

      // Sort skips so that skips with allows_heavy_waste=true appear last in the array
      return processedSkips.sort((a: Skip, b: Skip) => {
        if (!a.allows_heavy_waste && b.allows_heavy_waste) {
          return 1;
        } else if (a.allows_heavy_waste && !b.allows_heavy_waste) {
          return -1;
        }
        return 0;
      });
    },
  });
}
