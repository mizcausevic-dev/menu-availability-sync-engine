$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
    param(
        [string]$Path,
        [string]$Title,
        [string]$Subtitle,
        [string[]]$Bullets
    )

    $bitmap = New-Object System.Drawing.Bitmap 1600, 1000
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.Clear([System.Drawing.Color]::FromArgb(7, 10, 15))

    $panelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(11, 18, 32))
    $accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(55, 255, 139))
    $accent2Brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 199, 255))
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(233, 243, 255))
    $mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(170, 188, 205))
    $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(25, 199, 255), 2)

    $graphics.FillRectangle($panelBrush, 48, 48, 1504, 904)
    $graphics.DrawRectangle($borderPen, 48, 48, 1504, 904)
    $graphics.DrawString("MENU AVAILABILITY SYNC ENGINE", (New-Object System.Drawing.Font("Consolas", 18, [System.Drawing.FontStyle]::Bold)), $accentBrush, 92, 92)
    $graphics.DrawString($Title, (New-Object System.Drawing.Font("Segoe UI", 34, [System.Drawing.FontStyle]::Bold)), $textBrush, 92, 144)
    $graphics.DrawString($Subtitle, (New-Object System.Drawing.Font("Segoe UI", 18)), $mutedBrush, 92, 214)

    $y = 320
    foreach ($bullet in $Bullets) {
        $graphics.DrawString("•", (New-Object System.Drawing.Font("Segoe UI", 20, [System.Drawing.FontStyle]::Bold)), $accent2Brush, 108, $y)
        $graphics.DrawString($bullet, (New-Object System.Drawing.Font("Segoe UI", 18)), $textBrush, 138, $y + 2)
        $y += 84
    }

    $graphics.DrawString("Synthetic proof render for README packaging.", (New-Object System.Drawing.Font("Segoe UI", 16)), $mutedBrush, 92, 880)
    $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $bitmap.Dispose()
}

New-ProofImage -Path (Join-Path $screenshots "01-overview-proof.png") `
    -Title "Overview proof" `
    -Subtitle "Menu queues, sync blockers, and channel posture in one buyer-safe restaurant commerce surface." `
    -Bullets @(
        "Availability cases stay tied to channel and item pressure.",
        "Sync blockers map directly to required evidence.",
        "Launch posture is visible before promos and marketplace windows burn."
    )

New-ProofImage -Path (Join-Path $screenshots "02-availability-lane-proof.png") `
    -Title "Availability lane" `
    -Subtitle "Each menu case shows owner, channel pressure, and the next restaurant-safe move." `
    -Bullets @(
        "Channel cases stay linked to customer and revenue impact.",
        "Operators see the next safe handoff.",
        "High-risk availability drift surfaces early."
    )

New-ProofImage -Path (Join-Path $screenshots "03-sync-risks-proof.png") `
    -Title "Sync risks" `
    -Subtitle "Availability parity, modifier drift, stale cache, and search mismatch stay tied to proof." `
    -Bullets @(
        "Each blocker lists what evidence is still missing.",
        "Impact areas stay visible for prioritization.",
        "Restaurant launch work stays mapped to a named owner."
    )

New-ProofImage -Path (Join-Path $screenshots "04-channel-posture-proof.png") `
    -Title "Channel posture" `
    -Subtitle "Launch packets show confidence score, review window, and channel-safe decision posture." `
    -Bullets @(
        "Red packets show immediate customer trust risk.",
        "Yellow packets preserve the next safe promo cycle.",
        "Green packets stay governed without noise."
    )
