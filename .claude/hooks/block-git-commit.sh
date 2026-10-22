#!/usr/bin/env bash
# PreToolUse (Bash): tolak `git commit` / `git push` yang mengawali segmen perintah.
# Hanya awal segmen (awal baris atau setelah ; && || |) yang diperiksa, sehingga
# teks "git commit" di dalam echo/string tidak terblokir. Baris di dalam heredoc
# (<<EOF ... EOF) dilewati.
set -u
INPUT=$(cat)
CMD=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)
[ -z "$CMD" ] && exit 0

HEREDOC_END=""
while IFS= read -r line || [ -n "$line" ]; do
  # Sedang di dalam heredoc: lewati sampai penutup
  if [ -n "$HEREDOC_END" ]; then
    trimmed=$(printf '%s' "$line" | sed -E 's/^[[:space:]]+//; s/[[:space:]]+$//')
    [ "$trimmed" = "$HEREDOC_END" ] && HEREDOC_END=""
    continue
  fi

  # Pecah baris per segmen: ; && || |
  SEGS=$(printf '%s\n' "$line" | sed -E 's/(&&|\|\||;|\|)/\n/g')
  while IFS= read -r seg; do
    s=$(printf '%s' "$seg" | sed -E 's/^[[:space:]]+//; s/^(sudo( -[A-Za-z]+)*|env|command|time|nice)[[:space:]]+//; s/^([A-Za-z_][A-Za-z0-9_]*=[^[:space:]]*[[:space:]]+)*//')
    if printf '%s' "$s" | grep -Eq '^git[[:space:]]+(-[A-Za-z-]+([[:space:]]+[^[:space:]]+)?[[:space:]]+)*(commit|push)([[:space:]]|$)'; then
      echo "Ditolak: '$s' — Claude tidak boleh commit/push. User commit manual; usulkan pesan commit saja." >&2
      exit 2
    fi
  done <<< "$SEGS"

  # Deteksi pembuka heredoc pada baris ini (<<EOF, <<-EOF, <<'EOF', <<"EOF")
  if printf '%s' "$line" | grep -Eq '<<-?[[:space:]]*["'"'"']?[A-Za-z_][A-Za-z0-9_]*["'"'"']?'; then
    HEREDOC_END=$(printf '%s' "$line" | sed -E 's/.*<<-?[[:space:]]*["'"'"']?([A-Za-z_][A-Za-z0-9_]*)["'"'"']?.*/\1/')
  fi
done <<< "$CMD"
exit 0
