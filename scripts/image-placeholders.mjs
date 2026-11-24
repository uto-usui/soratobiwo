#!/usr/bin/env node
/**
 * サイト内の画像を幅 24px に縮めた仮の画像を作り、app/assets/json/imagePlaceholders.json に書き出す。
 * UtilityCoverImage が src をキーに引いて、本物が読み込まれるまでぼかして敷く。
 *
 * usage:
 *   node scripts/image-placeholders.mjs
 *
 * 画像を追加・差し替えたら流し直す。WordPress の画像は対象外。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const json = (name) =>
  JSON.parse(readFileSync(resolve(root, 'app/assets/json', name), 'utf8'))
const OUT = resolve(root, 'app/assets/json/imagePlaceholders.json')
const WIDTH = 24

// コンポーネントに直接書いている画像
const paths = new Set([
  '/images/2026/image2.webp',
  '/images/2026/image10.webp',
  '/images/2026/image12.webp',
  '/images/2026/image15.webp',
  '/images/2026/image18.webp',
  '/images/2026/image19.webp',
  '/images/hero/item7-800.webp',
  '/images/hero/item13-800.webp',
])

// JSON から表示に使う画像（liveArchive は一覧で画像を出さないので除く）
for (const item of [...json('live.json'), ...json('news.json')]) {
  if (!item.wp && item.hero) paths.add(`/images/${item.hero}`)
}
for (const item of json('music.json')) {
  if (item.img) paths.add(`/images/album/${item.img}`)
}
for (const page of json('special.json')) {
  for (const item of page.items ?? []) {
    if (item.image) paths.add(`/images/${item.image}`)
  }
}
for (const item of json('profile.json')) {
  if (item.artistImage) paths.add(`/images/${item.artistImage}`)
}

const result = {}
for (const path of [...paths].sort()) {
  const image = sharp(resolve(root, 'public', path.slice(1)))
  const { width, height } = await image.metadata()
  const buffer = await image.resize(WIDTH).webp({ quality: 40 }).toBuffer()
  result[path] = {
    src: `data:image/webp;base64,${buffer.toString('base64')}`,
    width,
    height,
  }
}

writeFileSync(OUT, `${JSON.stringify(result, null, 2)}\n`)
const bytes = Object.values(result).reduce((sum, p) => sum + p.src.length, 0)
console.log(`${Object.keys(result).length} images, ${bytes} chars -> ${OUT}`)
