---
name: update-live
description: soratobiwoのライブ情報(app/assets/json/live.json)に新しいイベントを追加・更新する。ユーザーからライブ情報を受け取り、会場URLを検索し、JSONスキーマに合わせて整形・挿入する。トリガー: ライブ情報追加、live.json更新、新しいライブ、イベント追加、ライブ告知
---

# ライブ情報更新スキル

`app/assets/json/live.json` にライブイベントエントリを追加・更新する。

## ワークフロー

### 1. ユーザー入力から情報を抽出

必要な情報:
- 日程・時間（OPEN/START）
- 会場名
- イベントタイトル
- 出演者（ラインナップ）
- 料金・チケット情報（URL含む）
- その他コメント
- フライヤー画像URL（後から提供される場合あり）

不足情報がある場合はユーザーに確認する。

### 2. 会場URLをWebSearchで検索

会場の公式サイトURLが不明な場合、WebSearchで `{会場名} 公式サイト` を検索して取得する。
既知の会場URLは過去エントリから流用してよい（live.jsonをgrepで検索）。

### 3. JSONエントリを整形

スキーマ詳細は [references/schema.md](references/schema.md) を参照。

整形時の注意:
- `date`: OPENの時刻を使用。TBAなら `T00:00:00`
- `id`: `YYYY-MM-DD-venue` 形式。同日同会場の既存エントリがないか確認
- `info[0]`: 会場INFO。必ず `INFO` で始める。URLがあれば `<a href="..." target="_blank">...</a>` で囲む
- `info` 中間: チケットリンクを `<a>` タグで。ユーザー提供のURLをそのまま使用
- `info` 末尾: 説明テキスト。改行は `<br>` に変換
- `title` / `titleMobile` / `titleDesktop`: 通常すべて同じ値
- `act`: 出演者を ` / ` で区切る。提供順を維持
- `fee`: 複数チケット種別は丸数字（①②③）で区切り、Drink代は括弧付きで補足
- `hero`: 画像URLが未提供なら空文字 `""` にして後で差し替え
- `wp`: hero URLが `wp.soratobiwo.com` なら `true`、それ以外は `false`

### 4. live.jsonに挿入

日付降順を維持して適切な位置に挿入する。Editツールで該当箇所の前後のエントリを含めて編集する。

### 5. 確認

整形結果をユーザーに提示して確認を得る。修正があれば反映する。
