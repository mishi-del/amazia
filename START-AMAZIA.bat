@echo off
title AMAZIA - starting website and server
cd /d "%~dp0"
echo.
echo Starting AMAZIA...
echo Keep this window OPEN while you use the site.
echo.
call npm run dev:all
pause
