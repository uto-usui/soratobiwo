import images from '~/assets/json/images.json'

export interface ImageInfo {
  width: number
  height: number
  /** 幅違いの WebP がある幅。`foo.jpg` なら `foo-800.webp` のように置いてある */
  widths: number[]
  /** 幅 24px に縮めた画像の data URI */
  placeholder: string
}

/**
 * scripts/image-variants.mjs が書き出した画像の情報を引く。サイト外の画像は undefined
 */
export function imageInfo(path: string): ImageInfo | undefined {
  return (images as Record<string, ImageInfo>)[path]
}

/**
 * 幅違いの WebP を並べた srcset を作る。サイト外の画像は undefined
 */
export function imageSrcset(path: string): string | undefined {
  return imageInfo(path)
    ?.widths.map((width) => `${path.replace(/\.\w+$/, `-${width}.webp`)} ${width}w`)
    .join(', ')
}

/**
 * 画像の縦横比で枠の高さを確保する。読み込み前に高さが 0 になってレイアウトがずれるのを防ぐ
 */
export function aspectRatioStyle(path: string): { aspectRatio?: string } {
  const info = imageInfo(path)
  return info ? { aspectRatio: `${info.width} / ${info.height}` } : {}
}
