import sharp from 'sharp';
import { shapes, type Shape } from './shapes';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function wrap(text: string, max: number, maxLines: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > max) {
      lines.push(line);
      line = word;
    } else line = (line + ' ' + word).trim();
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\W*\w*$/, '') + '…';
  }
  return lines;
}

/** Renders a 1200×630 share card as PNG. */
export async function shareCard(opts: { kicker: string; title: string; subtitle?: string; body: string; shape: Shape }) {
  const body = wrap(opts.body, 48, 4)
    .map((l, i) => `<text x="70" y="${370 + i * 42}" class="body">${esc(l)}</text>`)
    .join('');
  const titleLines = wrap(opts.title, 24, 2);
  const title = titleLines.map((l, i) => `<text x="70" y="${190 + i * 74}" class="title">${esc(l)}</text>`).join('');
  const subY = 190 + titleLines.length * 74 - 20;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <style>
    .kicker { font-family: Arial, 'Helvetica Neue', 'DejaVu Sans', sans-serif; font-size: 26px; font-weight: 600; fill: #8a5a2b; letter-spacing: 3px; }
    .title { font-family: Georgia, 'DejaVu Serif', serif; font-size: 68px; font-weight: 700; fill: #24211c; }
    .sub { font-family: Georgia, 'DejaVu Serif', serif; font-size: 32px; font-style: italic; fill: #6a6357; }
    .body { font-family: Arial, 'Helvetica Neue', 'DejaVu Sans', sans-serif; font-size: 30px; fill: #3d382f; }
    .brand { font-family: Georgia, 'DejaVu Serif', serif; font-size: 30px; font-weight: 700; fill: #1f6f66; }
  </style>
  <rect width="1200" height="630" fill="#f6f2e9"/>
  <rect x="0" y="600" width="1200" height="30" fill="#1f6f66"/>
  <text x="70" y="100" class="kicker">${esc(opts.kicker.toUpperCase())}</text>
  ${title}
  ${opts.subtitle ? `<text x="70" y="${subY}" class="sub">${esc(opts.subtitle)}</text>` : ''}
  ${body}
  <g transform="translate(800 80) scale(3.2)" fill="#c9a77f">${shapes[opts.shape]}</g>
  <text x="1130" y="570" text-anchor="end" class="brand">Cocaine Hippos: After Us</text>
</svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}
