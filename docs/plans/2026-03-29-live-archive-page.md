# Live Archive Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** liveArchive.json の過去ライブデータを年別タイムライン形式で一覧表示するページを新設する

**Architecture:** 新規ページ `app/pages/live/archive.vue` が `liveArchive.json` を読み込み、新規コンポーネント `ContentTimeline.vue` で年別グループ化タイムラインとして描画する。`/live/` ページ末尾にアーカイブへの導線リンクを追加。

**Tech Stack:** Nuxt 4 / Vue 3 / TypeScript / SCSS / dayjs

---

### Task 1: ContentTimeline コンポーネント作成

**Files:**
- Create: `app/components/content/Timeline.vue`

**Step 1:** 新規コンポーネントを作成

- Props: `listData: LiveEvent[]`
- ロジック: `listData` を年でグループ化（降順）、各年内は日付降順
- 表示: 年ヘッダー + イベント行（日付・タイトル・会場）
- スタイル: 左縦線タイムライン、年ヘッダーにドット、scoped SCSS
- 既存のvw基準サイズ・カラー変数に準拠

**Step 2:** コミット

---

### Task 2: アーカイブページ作成

**Files:**
- Create: `app/pages/live/archive.vue`

**Step 1:** ページを作成

- `liveArchive.json` をインポート
- 既存レイアウト（LayoutWrapper → ContentMainOuter → ContentHeroSub + ContentMainInner）を使用
- ContentTimeline に liveArchive データを渡す
- SEO: `usePageSeo({ title: 'live archive|soratobiwo' })`
- `usePageLoading()` 呼び出し

**Step 2:** コミット

---

### Task 3: /live/ ページにアーカイブ導線を追加

**Files:**
- Modify: `app/pages/live/index.vue`

**Step 1:** ContentMainInner 内、ContentList の下にアーカイブリンクを追加

- NuxtLink で `/live/archive/` へ遷移
- テキスト: 「過去のライブはこちら →」

**Step 2:** コミット

---

### Task 4: prerenderルート追加

**Files:**
- Modify: `nuxt.config.ts`

**Step 1:** `prerender:routes` フックに `/live/archive` を追加

**Step 2:** コミット

---

### Task 5: ビルド確認

**Step 1:** `npm run generate` でSSGビルドが成功することを確認
**Step 2:** `/live/archive` ルートが生成されていることを確認
