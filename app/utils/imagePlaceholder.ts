import placeholders from '~/assets/json/imagePlaceholders.json'

export interface ImagePlaceholder {
  src: string
  width: number
  height: number
}

/**
 * scripts/image-placeholders.mjs が作った仮の画像を引く。サイト外の画像は undefined
 */
export function imagePlaceholder(path: string): ImagePlaceholder | undefined {
  return (placeholders as Record<string, ImagePlaceholder>)[path]
}

/**
 * 画像の縦横比で枠の高さを確保する。読み込み前に高さが 0 になってレイアウトがずれるのを防ぐ
 */
export function aspectRatioStyle(path: string): { aspectRatio?: string } {
  const placeholder = imagePlaceholder(path)
  return placeholder ? { aspectRatio: `${placeholder.width} / ${placeholder.height}` } : {}
}
