/**
 * `/images/foo.webp` から、同じ場所に置いた `foo-800.webp` などを並べた srcset を作る
 */
export function webpVariantSrcset(path: string, widths: number[] = [800, 1600]): string {
  return widths
    .map((width) => `${path.replace(/\.webp$/, `-${width}.webp`)} ${width}w`)
    .join(', ')
}
