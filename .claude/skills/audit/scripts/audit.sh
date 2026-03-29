#!/usr/bin/env bash
# Codebase audit - programmatic checks
# Usage: bash audit.sh <src-directory>

set -uo pipefail

SRC="${1:-.}"
SEPARATOR="────────────────────────────────────────"

echo "=== CODEBASE AUDIT: PROGRAMMATIC CHECKS ==="
echo "Scanning: $SRC"
echo ""

# 1. Large files (>200 lines)
echo "$SEPARATOR"
echo "1. LARGE FILES (>200 lines)"
echo "$SEPARATOR"
count=0
while IFS= read -r file; do
  lines=$(wc -l < "$file")
  if [ "$lines" -gt 200 ]; then
    echo "  $file ($lines lines)"
    count=$((count + 1))
  fi
done < <(find "$SRC" -name "*.tsx" -o -name "*.ts" | grep -v node_modules | grep -v '.d.ts' | sort)
[ "$count" -eq 0 ] && echo "  None found."
echo ""

# 2. Duplicate imports (same import line in 3+ files)
echo "$SEPARATOR"
echo "2. DUPLICATE IMPORTS (same import in 3+ files)"
echo "$SEPARATOR"
grep -rh "^import " "$SRC" --include="*.tsx" --include="*.ts" 2>/dev/null \
  | grep -v node_modules \
  | sort | uniq -c | sort -rn \
  | awk '$1 >= 3 { print "  " $0 }' \
  | head -20
echo ""

# 3. Repeated className strings (identical class in 3+ places)
echo "$SEPARATOR"
echo "3. REPEATED CLASSNAME STRINGS (3+ occurrences)"
echo "$SEPARATOR"
grep -roh 'className="[^"]\{30,\}"' "$SRC" --include="*.tsx" 2>/dev/null \
  | grep -v node_modules \
  | sort | uniq -c | sort -rn \
  | awk '$1 >= 3 { print "  " $0 }' \
  | head -15
echo ""

# 4. Duplicate Record/map definitions
echo "$SEPARATOR"
echo "4. POTENTIAL DUPLICATE OBJECT MAPS"
echo "$SEPARATOR"
echo "  Files with Record<string, string> definitions:"
grep -rn "Record<string, string>" "$SRC" --include="*.tsx" --include="*.ts" 2>/dev/null \
  | grep -v node_modules \
  | sed 's/^/  /'
echo ""

# 5. TODO/FIXME markers
echo "$SEPARATOR"
echo "5. TODO/FIXME MARKERS"
echo "$SEPARATOR"
grep -rn "TODO\|FIXME\|HACK\|XXX" "$SRC" --include="*.tsx" --include="*.ts" 2>/dev/null \
  | grep -v node_modules \
  | sed 's/^/  /' \
  | head -20
count=$(grep -rc "TODO\|FIXME\|HACK\|XXX" "$SRC" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v node_modules | awk -F: '{s+=$2} END {print s+0}')
echo "  Total: $count"
echo ""

# 6. Inline type assertions (as unknown as)
echo "$SEPARATOR"
echo "6. INLINE TYPE ASSERTIONS (as unknown as)"
echo "$SEPARATOR"
grep -rn "as unknown as" "$SRC" --include="*.tsx" --include="*.ts" 2>/dev/null \
  | grep -v node_modules \
  | sed 's/^/  /' \
  | head -20
echo ""

# 7. Repeated string literals (same string in 3+ files)
echo "$SEPARATOR"
echo "7. REPEATED STRING PATTERNS"
echo "$SEPARATOR"
echo "  Repeated text-muted-foreground patterns:"
grep -roh 'text-[a-z]*-foreground' "$SRC" --include="*.tsx" 2>/dev/null \
  | grep -v node_modules \
  | sort | uniq -c | sort -rn \
  | head -5 \
  | sed 's/^/  /'
echo ""
echo "  Repeated status-related strings:"
grep -roh '"bg-[a-z]*-[0-9]* text-[a-z]*-[0-9]*"' "$SRC" --include="*.tsx" --include="*.ts" 2>/dev/null \
  | grep -v node_modules \
  | sort | uniq -c | sort -rn \
  | awk '$1 >= 2 { print "  " $0 }' \
  | head -10
echo ""

# 8. File count summary
echo "$SEPARATOR"
echo "SUMMARY"
echo "$SEPARATOR"
tsx_count=$(find "$SRC" -name "*.tsx" | grep -v node_modules | wc -l | tr -d ' ')
ts_count=$(find "$SRC" -name "*.ts" | grep -v node_modules | grep -v '.d.ts' | wc -l | tr -d ' ')
echo "  TSX files: $tsx_count"
echo "  TS files: $ts_count"
total_lines=$(find "$SRC" \( -name "*.tsx" -o -name "*.ts" \) | grep -v node_modules | grep -v '.d.ts' | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
echo "  Total lines: $total_lines"
echo ""
echo "=== END AUDIT ==="
