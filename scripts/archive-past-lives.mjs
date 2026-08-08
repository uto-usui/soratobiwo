#!/usr/bin/env node
/**
 * live.json から開催日を過ぎたイベントを liveArchive.json へ移す。
 *
 * usage:
 *   node scripts/archive-past-lives.mjs [--dry-run]
 *
 * 日付の比較は文字列の前方一致だけで行い、Date のパースはしない。
 * liveArchive.json には `+09:00` 付きの表記が混在しているため。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const LIVE = resolve(root, 'app/assets/json/live.json')
const ARCHIVE = resolve(root, 'app/assets/json/liveArchive.json')

const dryRun = process.argv.includes('--dry-run')

const read = (file) => JSON.parse(readFileSync(file, 'utf8'))
const write = (file, data) =>
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`)

// ローカル日付を使う。toISOString() は UTC なので朝 9 時前に前日扱いになる
const now = new Date()
const today = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0'),
].join('-')

const live = read(LIVE)
const archive = read(ARCHIVE)

// 当日開催はまだ移さない
const past = live.filter((event) => event.date.slice(0, 10) < today)
const upcoming = live.filter((event) => event.date.slice(0, 10) >= today)

if (past.length === 0) {
  console.log(`移行対象なし（基準日 ${today} / live.json ${live.length}件）`)
  process.exit(0)
}

const archiveIds = new Set(archive.map((event) => event.id))
const collisions = past
  .filter((event) => archiveIds.has(event.id))
  .map((event) => event.id)

if (collisions.length > 0) {
  console.error(`id が liveArchive.json と衝突: ${collisions.join(', ')}`)
  process.exit(1)
}

for (const event of past) {
  console.log(`  ${event.date.slice(0, 10)}  ${event.place}  ${event.title}`)
}
console.log(
  `${past.length}件を移行（live.json ${live.length}→${upcoming.length} / liveArchive.json ${archive.length}→${archive.length + past.length}）`,
)

if (dryRun) {
  console.log('--dry-run のため書き込みなし')
  process.exit(0)
}

// liveArchive.json は既存の並びを崩さず先頭に足すだけにする。
// 表示側の ContentTimeline が年別にグルーピングして降順ソートするため、
// ファイル内の順序は表示に影響しない。全体ソートは差分を無駄に膨らませる。
write(LIVE, upcoming)
write(ARCHIVE, [...past, ...archive])
console.log('書き込み完了')
