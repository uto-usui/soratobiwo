# live.json エントリスキーマ

## フィールド定義

| フィールド | 型 | 説明 |
|---|---|---|
| `date` | string | ISO 8601形式 `YYYY-MM-DDThh:mm:ss`。STARTの時刻を使用。TBAの場合は `T00:00:00` |
| `id` | string | `YYYY-MM-DD-venue-shortname`。会場名を英小文字・短縮形で（例: bangboo, vijon, utausakana） |
| `place` | string | 会場名（表示用。例: "梅田 BANGBOO", "北堀江club vijon"） |
| `info` | string[] | 下記「info配列の構造」参照 |
| `soldOut` | boolean | 新規は常に `false` |
| `titleMobile` | string | モバイル用タイトル（通常titleと同じ） |
| `titleDesktop` | string | デスクトップ用タイトル（通常titleと同じ） |
| `title` | string | イベントタイトル |
| `time` | string | `OPEN HH:MM / START HH:MM` 形式。未定は `OPEN TBA / START TBA` |
| `act` | string | 出演者を ` / ` 区切り |
| `fee` | string | 料金情報（自由形式テキスト） |
| `hero` | string | フライヤー画像URL。WordPressの場合 `https://wp.soratobiwo.com/wp-content/uploads/YYYY/MM/filename` |
| `wp` | boolean | hero画像がWordPressホストなら `true` |

## info配列の構造

順序が重要。以下の順で要素を格納:

1. **会場INFO** (必須・先頭): `INFO <a href="会場URL" target="_blank">会場表示名</a>`
   - URLが不明な場合: `INFO 会場名`
2. **チケットリンク** (0個以上): `<a href="チケットURL" target="_blank">チケット種別名</a>`
   - 例: `<a href="https://tiget.net/events/xxx" target="_blank">入場チケット(TIGET)</a>`
   - 例: `<a href="https://premier.twitcasting.tv/xxx" target="_blank">ツイキャスプレミアム配信</a>`
3. **説明文** (最後): 自由テキスト。改行は `<br>`

## 配列の並び順

live.jsonは日付降順（新しい方が先頭）。新エントリは適切な位置に挿入する。

## fee フォーマット例

- `adv ¥3,000 / door ¥3,500 / +1drink`
- `adv ¥3,000 / day ¥3,500 / online ¥2,500 / +1drink`
- `入場無料（投げ銭あり）`
- `①入場チケット¥3,000(+1drink¥700) ②配信チケット¥2,300`

複数チケット種別がある場合は丸数字（①②③）で区切る。

無料の場合も `adv ¥Free / door ¥Free` の形式を維持する。
- `adv ¥Free / door ¥Free / +1drink`
- `adv ¥Free / door ¥Free / +1drink（投げ銭）`
