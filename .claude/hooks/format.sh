#!/usr/bin/env bash
# PostToolUse (Edit|Write): format file yang baru diubah + pemeriksaan cepat.
# Selalu exit 0 agar tidak pernah memblokir Claude.
set -u
INPUT=$(cat)
FILE=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)
[ -z "$FILE" ] && exit 0
[ -f "$FILE" ] || exit 0
ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$ROOT" || exit 0

case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.mts|*.css|*.json|*.md|*.yml|*.yaml)
    pnpm exec prettier --write --log-level warn "$FILE" >/dev/null 2>&1
    ;;
esac

case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.mts)
    OUT=$(pnpm exec eslint --no-warn-ignored "$FILE" 2>&1)
    if [ $? -ne 0 ]; then
      printf 'eslint: %s\n' "$(printf '%s' "$OUT" | tail -n 20)" >&2
    fi
    ;;
esac
exit 0
