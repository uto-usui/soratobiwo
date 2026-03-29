# ライブアーカイブページ設計

## 要件

- `liveArchive.json` の過去ライブデータを一覧表示する新規ページ
- `/live/` ページからリンクで遷移（メニューには追加しない）
- シンプルなタイムラインリスト（日付・会場・タイトルの3情報）
- `ContentList` / `ContentArticle` は使わない（スペース過剰）
- `live.json` → `liveArchive.json` の移行は別途LLM支援で手動運用

## データ概要

- liveArchive.json: 174件（2019〜2022）
- live.json内の過去イベント: 91件（2023〜2026.03）→ 適宜アーカイブへ移行予定
- 合計: 年あたり約30〜47件、全体で265件程度

## 設計

### ルーティング

- **URL**: `/live/archive/`
- **ファイル**: `app/pages/live/archive.vue`
- **prerenderルート**: nuxt.config.ts の `prerender:routes` フックに `/live/archive` を追加

### ページ構成

```
/live/archive/
├── LayoutWrapper（既存）
│   └── ContentMainOuter（既存）
│       ├── ContentHeroSub（既存・liveページと同じヒーロー画像）
│       └── ContentMainInner（既存）
│           └── ContentTimeline（新規コンポーネント）
│               ├── 年ヘッダー "2022"
│               │   ├── TimelineItem: 日付 | タイトル | 会場
│               │   ├── TimelineItem: ...
│               │   └── ...
│               ├── 年ヘッダー "2021"
│               │   └── ...
│               └── ...
```

### 新規コンポーネント: `ContentTimeline.vue`

`app/components/content/Timeline.vue`

**Props:**
```typescript
interface Props {
  listData: LiveEvent[]
}
```

**表示仕様:**
- liveArchive.json を年ごとにグループ化（降順: 新しい年が上）
- 年ヘッダー: 年をラベル表示
- 各イベント行: `日付（YYYY.MM.DD.ddd）` | `タイトル` | `会場名`
- 左側に縦線のタイムラインライン（CSSのborder-leftまたはpseudo-element）
- 年ヘッダーにドット（タイムラインノード）
- モバイル: 1カラム、日付を上・タイトルと会場を下に配置
- デスクトップ: 横並びの行レイアウト

**スタイル方針:**
- 既存のカラーパレット使用（`$color-white`, `$color-primary`, `$color-bg-secondary`）
- フォント: `$font-Nunito`（日付）/ `$font-sans-serif`（タイトル・会場）
- vw基準のフォントサイズ（既存コンポーネントの慣習に準拠）
- scoped SCSS

### `/live/` ページからの導線

`live/index.vue` の `ContentMainInner` 末尾に、アーカイブページへのリンクを追加:

```
「過去のライブはこちら →」
```

NuxtLinkで `/live/archive/` へ遷移。既存ContentListの下に配置。

### nuxt.config.ts 変更

`prerender:routes` フックに追加:
```typescript
ctx.routes.add('/live/archive')
```

### SEO

- title: `live archive|soratobiwo`
- description: soratobiwoの過去のライブ一覧

## 変更対象ファイル

| ファイル | 変更内容 |
|---|---|
| `app/pages/live/archive.vue` | 新規: アーカイブページ |
| `app/components/content/Timeline.vue` | 新規: タイムラインコンポーネント |
| `app/pages/live/index.vue` | 変更: アーカイブへのリンク追加 |
| `nuxt.config.ts` | 変更: prerenderルート追加 |
