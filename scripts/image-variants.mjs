#!/usr/bin/env node
/**
 * サイト内の画像について、幅違いの WebP（`foo-800.webp` など）と、幅 24px の仮の画像を作る。
 * 結果は app/assets/json/images.json に書き出し、UtilityCoverImage が src をキーに引いて
 * srcset を組み、本物が読み込まれるまで仮の画像をぼかして敷く。
 *
 * usage:
 *   node scripts/image-variants.mjs [--force]
 *
 * 画像を追加・差し替えたら流し直す。幅違いのファイルがすでにあれば作り直さない（--force で作り直す）。
 * WordPress の画像は対象外（scripts/wp-hero-srcset.mjs が受け持つ）。
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const json = (name) =>
  JSON.parse(readFileSync(resolve(root, 'app/assets/json', name), 'utf8'))
const OUT = resolve(root, 'app/assets/json/images.json')
const DEFAULT_WIDTHS = [400, 800, 1200, 1600]
const PLACEHOLDER_WIDTH = 24
const QUALITY = 75

const force = process.argv.includes('--force')

/** @type {Map<string, { source: string, widths: number[] }>} key は表示に使うパス */
const entries = new Map()
// 先に登録したものを優先する（2026 年の写真は JSON からも参照される）
const add = (key, { source = `public${key}`, widths = DEFAULT_WIDTHS } = {}) => {
  if (!entries.has(key)) entries.set(key, { source, widths })
}

// 2026 年の写真は、書き出し済みの WebP ではなく元の JPEG から作る（圧縮を 1 回で済ませる）
for (const n of [2, 6, 8, 10, 12, 15, 18, 19]) {
  add(`/images/2026/image${n}.webp`, {
    source: `app/assets/images/2026_raw/image${n}.jpg`,
    widths: [800, 1600],
  })
}
// トップのサブの写真
add('/images/hero/item7.jpg', { widths: [400, 800, 1200] })
add('/images/hero/item13.jpg', { widths: [400, 800, 1200] })

// JSON から表示に使う画像（liveArchive は画像を出さないので除く）
for (const item of [...json('live.json'), ...json('news.json')]) {
  if (!item.wp && item.hero) add(`/images/${item.hero}`)
}
for (const item of json('music.json')) {
  if (item.img) add(`/images/album/${item.img}`)
}
for (const page of json('special.json')) {
  for (const item of page.items ?? []) {
    if (item.image) add(`/images/${item.image}`)
  }
}
for (const item of json('profile.json')) {
  if (item.artistImage) add(`/images/${item.artistImage}`)
}

// 元より大きい幅は作らず、元の幅を最大のものにする
function variantWidths(widths, sourceWidth) {
  const result = widths.filter((w) => w < sourceWidth)
  if (sourceWidth < Math.max(...widths)) result.push(sourceWidth)
  return result
}

const variantPath = (key, width) => key.replace(/\.\w+$/, `-${width}.webp`)

const result = {}
let created = 0
for (const key of [...entries.keys()].sort()) {
  const { source, widths } = entries.get(key)
  const input = readFileSync(resolve(root, source))
  const { width, height } = await sharp(input).metadata()

  const outWidths = variantWidths(widths, width)
  for (const w of outWidths) {
    const out = resolve(root, 'public', variantPath(key, w).slice(1))
    if (!force && existsSync(out)) continue
    await sharp(input).resize(w).webp({ quality: QUALITY }).toFile(out)
    created++
  }

  const placeholder = await sharp(input)
    .resize(PLACEHOLDER_WIDTH)
    .webp({ quality: 40 })
    .toBuffer()
  result[key] = {
    width,
    height,
    widths: outWidths,
    placeholder: `data:image/webp;base64,${placeholder.toString('base64')}`,
  }
}

writeFileSync(OUT, `${JSON.stringify(result, null, 2)}\n`)
console.log(`${Object.keys(result).length} images, ${created} variants created -> ${OUT}`)
