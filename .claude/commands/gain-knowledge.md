---
allowed-tools: [Read, Edit, Write]
description: セッション中のフィードバックをai/docs/knowledge.mdに追加
---

# Gain-Knowledge コマンド

セッション中に得られたフィードバックや新しい知識を `ai/docs/knowledge.md` に追加するコマンドです。

## 使用方法

```bash
/project:gain-knowledge
```

## 例

```bash
/project:gain-knowledge
```

## 実行手順

1. **知識ファイルの確認**: `ai/docs/claude_code/knowledge.md` が存在するかチェック
2. **カテゴリの特定**: 引数からカテゴリを抽出、不明な場合は自動判別
3. **内容の追加**: 適切なカテゴリセクションに新しい知識を追加
4. **フォーマット統一**: 既存の形式に合わせて整形

## 実装

```markdown
セッション中のやり取りを分析して以下の処理を実行：

1. 知識ファイルの読み込み
2. セッション内容からフィードバックや新しい知識を自動抽出
3. カテゴリの自動判別（🔧Commands, 📋Code Style, 🏗️Architecture, ⚠️Gotchas, 🛠️Tools）
4. 新しいエントリの追加
5. ファイルの更新

追加形式:
- `[package-name]` プレフィックス付きで統一
- 既存エントリとの重複チェック
- アルファベット順でソート
```

## エラーハンドリング

- ファイルが存在しない場合は新規作成
- 不正なカテゴリの場合はGotchasに分類
- 重複する内容の場合は更新処理
