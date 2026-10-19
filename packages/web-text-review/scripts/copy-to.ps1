# Copy kit sang project Next.js khác
# Usage: .\copy-to.ps1 -Target "D:\path\to\other-project"

param(
  [Parameter(Mandatory = $true)]
  [string]$Target
)

$kitRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
# Actually: this script lives in packages/web-text-review/scripts
$source = Split-Path $PSScriptRoot -Parent
$dest = Join-Path $Target "packages\web-text-review"

if (-not (Test-Path $Target)) {
  Write-Error "Target không tồn tại: $Target"
  exit 1
}

New-Item -ItemType Directory -Force -Path (Split-Path $dest -Parent) | Out-Null
if (Test-Path $dest) {
  Remove-Item -Recurse -Force $dest
}
Copy-Item -Recurse -Force $source $dest

Write-Host "OK — đã copy kit tới: $dest"
Write-Host "Tiếp theo:"
Write-Host "  1. Chạy sql/schema.sql trên Supabase"
Write-Host "  2. Copy templates/nextjs/route.ts -> app/api/reviews/route.ts"
Write-Host "  3. Thêm <ReviewFeedbackSystem /> vào app/layout.tsx"
Write-Host "  Xem README.md trong package để biết chi tiết."
