@echo off
title AMAZIA - restart (fixes signup errors)
cd /d "%~dp0"
echo.
echo Stopping old servers on ports 3001 and 5173...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001" ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173" ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1
timeout /t 2 /nobreak >nul
echo.
echo Starting fresh...
call npm run dev:all
pause
