import { getCollection, type CollectionEntry } from 'astro:content';

export type Era = CollectionEntry<'eras'>;
export type Species = CollectionEntry<'species'>;

export async function getEras(): Promise<Era[]> {
  return (await getCollection('eras')).sort((a, b) => a.data.order - b.data.order);
}

export async function getSpecies(): Promise<Species[]> {
  const [eras, species] = await Promise.all([getEras(), getCollection('species')]);
  const order = new Map(eras.map((e) => [e.id, e.data.order]));
  return species.sort(
    (a, b) => (order.get(a.data.era.id) ?? 0) - (order.get(b.data.era.id) ?? 0) || a.data.name.localeCompare(b.data.name),
  );
}

export function speciesInEra(all: Species[], eraId: string): Species[] {
  return all.filter((s) => s.data.era.id === eraId);
}

export function children(all: Species[], id: string): Species[] {
  return all.filter((s) => s.data.ancestor?.id === id);
}

/** Ancestor chain from root down to (and including) the given species. */
export function lineage(all: Species[], sp: Species): Species[] {
  const byId = new Map(all.map((s) => [s.id, s]));
  const chain: Species[] = [sp];
  let cur = sp;
  while (cur.data.ancestor && byId.has(cur.data.ancestor.id)) {
    cur = byId.get(cur.data.ancestor.id)!;
    chain.unshift(cur);
  }
  return chain;
}

export const statusLabel = { real: 'Living today', canon: 'Canon', community: 'Community' } as const;
