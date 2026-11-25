#!/usr/bin/env node
/**
 * WordPress の hero 画像について、WordPress が自動で作る縮小版を調べて `heroSrcset` に書き込む。
 *
 * usage:
 *   node scripts/wp-hero-srcset.mjs [--dry-run]
 *
 * `heroSrcset` が未設定の `wp: true` エントリだけを対象にする。
 * REST API で見つからない画像（メディアライブラリ外のもの）は書き込まず、元画像のまま表示される。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FILES = ['live.json', 'news.json'].map((name) => resolve(root, 'app/assets/json', name))
const API = 'https://wp.soratobiwo.com/wp-json/wp/v2/media'
const MAX_WIDTH = 2000

const dryRun = process.argv.includes('--dry-run')

const read = (file) => JSON.parse(readFileSync(file, 'utf8'))
const write = (file, data) => writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`)

// WordPress の REST API はプラグインの PHP 警告を JSON の前に出すことがあるので、配列の開始位置から読む
async function fetchJsonArray(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  const text = await res.text()
  return JSON.parse(text.slice(text.indexOf('[')))
}

// ファイル名が短いと検索に大量にヒットするので、ページをめくって完全一致を探す
async function findMedia(sourceUrl) {
  const stem = sourceUrl
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
  for (let page = 1; page <= 10; page++) {
    const query = new URLSearchParams({
      search: stem,
      per_page: '100',
      page: String(page),
      _fields: 'source_url,media_details',
    })
    const items = await fetchJsonArray(`${API}?${query}`)
    const hit = items.find((item) => item.source_url === sourceUrl)
    if (hit) return hit
    if (items.length < 100) return null
  }
  return null
}

function buildSrcset(sourceUrl, details) {
  const { width, height } = details
  // 正方形の thumbnail などトリミングされた縮小版は、比率が変わるので除く
  const sameRatio = (w, h) => Math.abs(w / h - width / height) < 0.01
  const candidates = Object.values(details.sizes ?? {})
    .filter((size) => sameRatio(size.width, size.height))
    .map((size) => ({ width: size.width, url: size.source_url }))
  candidates.push({ width, url: sourceUrl })

  const byWidth = new Map()
  for (const c of candidates) {
    if (c.width <= MAX_WIDTH) byWidth.set(c.width, c.url)
  }
  const pick = (target) => [...byWidth.keys()].filter((w) => w >= target).sort((a, b) => a - b)[0]
  const widths = new Set([pick(640), pick(1024), Math.max(...byWidth.keys())])
  return [...widths]
    .filter(Boolean)
    .sort((a, b) => a - b)
    .map((w) => `${byWidth.get(w)} ${w}w`)
    .join(', ')
}

for (const file of FILES) {
  const data = read(file)
  let changed = 0
  for (const [index, item] of data.entries()) {
    if (!item.wp || !item.hero || item.heroSrcset) continue
    const media = await findMedia(item.hero)
    if (!media) {
      console.warn(`not found in media library: ${item.hero}`)
      continue
    }
    const heroSrcset = buildSrcset(item.hero, media.media_details)
    // hero の直後に置いて、JSON を読むときに並んで見えるようにする
    data[index] = Object.fromEntries(
      Object.entries(item).flatMap(([key, value]) =>
        key === 'hero'
          ? [
              [key, value],
              ['heroSrcset', heroSrcset],
            ]
          : [[key, value]]
      )
    )
    changed++
    console.log(`${item.id}: ${heroSrcset}`)
  }
  console.log(`${file.split('/').pop()}: ${changed} entries`)
  if (!dryRun && changed) write(file, data)
}
