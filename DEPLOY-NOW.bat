@echo off
title AMAZIA - Deploy helper
cd /d "%~dp0"
echo.
echo ========================================
echo   AMAZIA - Deploy to the internet
echo ========================================
echo.
echo This project needs TWO free hosts:
echo   1. Render.com  - API (reviews, newsletter, chat)
echo   2. Vercel.com  - Website (landing page)
echo.
echo Full steps: open DEPLOY.md in this folder
echo.
echo Quick start:
echo   1. Create GitHub repo and push this folder
echo   2. render.com - New Web Service - connect repo
echo   3. vercel.com - Import repo - add env vars from .env.production.example
echo   4. Firebase - add your Vercel URL to Authorized domains
echo.
start "" notepad "%~dp0DEPLOY.md"
pause
