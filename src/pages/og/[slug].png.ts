import type { APIRoute, GetStaticPaths } from 'astro';
import { getEntry } from 'astro:content';
import { getSpecies, type Species } from '../../lib/data';
import { shareCard } from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const species = await getSpecies();
  return [
    { params: { slug: 'default' }, props: { species: undefined } },
    ...species.map((s) => ({ params: { slug: s.id }, props: { species: s } })),
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const sp = props.species as Species | undefined;
  let png: Buffer;
  if (!sp) {
    png = await shareCard({
      kicker: 'Speculative evolution',
      title: "What becomes of Escobar's hippos?",
      body: 'Twenty million years of evolution for the invasive hippos of Colombia and their neighbours. Explore the eras and fill the open niches.',
      shape: 'hippo',
    });
  } else {
    const era = (await getEntry(sp.data.era))!;
    png = await shareCard({
      kicker: `${era.data.label} · ${era.data.title}`,
      title: sp.data.name,
      subtitle: sp.data.binomial,
      body: sp.data.summary,
      shape: sp.data.shape,
    });
  }
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
