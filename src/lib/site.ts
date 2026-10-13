import { frontmatter } from '../author.md';
import photo from '../assets/author.png';

export const SITE_NAME = 'Cocaine Hippos: After Us';

export const author = {
  show: Boolean(frontmatter.show),
  name: String(frontmatter.name ?? ''),
  role: frontmatter.role ? String(frontmatter.role) : undefined,
  link: frontmatter.link ? String(frontmatter.link) : undefined,
  photo,
};

/** schema.org Person for structured data. */
export function personLd(site: URL) {
  return {
    '@type': 'Person',
    name: author.name,
    url: author.link ?? new URL('/about/', site).href,
    ...(author.role && { jobTitle: author.role }),
  };
}
