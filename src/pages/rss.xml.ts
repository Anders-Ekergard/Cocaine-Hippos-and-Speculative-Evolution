import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { getSpecies } from '../lib/data';
import { SITE_NAME } from '../lib/site';

// Feed of all described species. Newest era first is not meaningful here,
// so readers simply see new items appear as species are added.
export const GET: APIRoute = async ({ site }) => {
  const species = await getSpecies();
  const items = await Promise.all(
    species.map(async (s) => {
      const era = (await getEntry(s.data.era))!;
      return {
        title: `${s.data.name} (${s.data.binomial})`,
        link: `/species/${s.id}/`,
        description: `${era.data.label}: ${s.data.summary}`,
        categories: [era.data.title, s.data.status],
      };
    }),
  );
  return rss({
    title: `${SITE_NAME}: species`,
    description: "Species in the speculative evolution of Pablo Escobar's cocaine hippos and their ecosystem.",
    site: site!,
    items,
  });
};
