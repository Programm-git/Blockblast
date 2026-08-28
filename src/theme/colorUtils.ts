function clamp255(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function parseHex(hex: string): [number, number, number, number] {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length >= 8 ? parseInt(h.slice(6, 8), 16) : 255;
  return [r, g, b, a];
}

function toHex(r: number, g: number, b: number, a = 255): string {
  const parts = [r, g, b, ...(a < 255 ? [a] : [])].map((v) => clamp255(v).toString(16).padStart(2, '0'));
  return `#${parts.join('')}`;
}

export function lighten(hex: string, amount: number): string {
  const [r, g, b, a] = parseHex(hex);
  return toHex(r + (255 - r) * amount, g + (255 - g) * amount, b + (255 - b) * amount, a);
}

export function darken(hex: string, amount: number): string {
  const [r, g, b, a] = parseHex(hex);
  return toHex(r * (1 - amount), g * (1 - amount), b * (1 - amount), a);
}

export function withAlpha(hex: string, alpha: number): string {
  const [r, g, b] = parseHex(hex);
  return toHex(r, g, b, Math.round(alpha * 255));
}

export function mix(hexA: string, hexB: string, t: number): string {
  const [r1, g1, b1] = parseHex(hexA);
  const [r2, g2, b2] = parseHex(hexB);
  return toHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}
