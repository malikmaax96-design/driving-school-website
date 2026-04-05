@echo off
title QuickLearn Driving School - Local Server (Port 8000)
echo ================================================================
echo  QuickLearn Driving School - Local Preview Server
echo ================================================================
echo.
echo  Starting server at http://localhost:8000/binary-gravity/
echo  Open this URL in your browser to preview the website.
echo.
echo  Press Ctrl+C to stop the server.
echo ================================================================
echo.

cd /d "%~dp0\.."

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
"$port = 8000; ^
$base = (Get-Location).Path; ^
$listener = New-Object System.Net.HttpListener; ^
$listener.Prefixes.Add('http://localhost:' + $port + '/'); ^
$listener.Start(); ^
Write-Host ('Server running at http://localhost:' + $port + '/binary-gravity/') -ForegroundColor Green; ^
Write-Host 'Serving from: ' $base -ForegroundColor Cyan; ^
Write-Host ''; ^
while ($listener.IsListening) { ^
  $ctx = $listener.GetContext(); ^
  $rawPath = $ctx.Request.Url.LocalPath.TrimStart('/'); ^
  if ($rawPath -eq '' -or $rawPath -match '/$') { $rawPath = $rawPath + 'index.html' }; ^
  $filePath = Join-Path $base $rawPath; ^
  if (Test-Path $filePath -PathType Leaf) { ^
    $content = [System.IO.File]::ReadAllBytes($filePath); ^
    $ext = [System.IO.Path]::GetExtension($filePath).ToLower(); ^
    $mime = @{'.html'='text/html; charset=utf-8';'.css'='text/css';'.js'='application/javascript';'.xml'='application/xml';'.txt'='text/plain';'.png'='image/png';'.jpg'='image/jpeg';'.ico'='image/x-icon';'.webp'='image/webp'}[$ext]; ^
    if (-not $mime) { $mime = 'application/octet-stream' }; ^
    $ctx.Response.ContentType = $mime; ^
    $ctx.Response.ContentLength64 = $content.Length; ^
    $ctx.Response.StatusCode = 200; ^
    Write-Host ('200 ' + $rawPath) -ForegroundColor Gray; ^
    $ctx.Response.OutputStream.Write($content, 0, $content.Length) ^
  } else { ^
    $body = [System.Text.Encoding]::UTF8.GetBytes('404 - Not Found: ' + $rawPath); ^
    $ctx.Response.StatusCode = 404; ^
    $ctx.Response.ContentLength64 = $body.Length; ^
    Write-Host ('404 ' + $rawPath) -ForegroundColor Red; ^
    $ctx.Response.OutputStream.Write($body, 0, $body.Length) ^
  }; ^
  $ctx.Response.OutputStream.Close() ^
}"

pause
