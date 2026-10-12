@echo off
title Desplegar a Vercel - Sistema Experto POS Negira S.A.
echo =======================================================
echo    Desplegando Sistema Experto POS a Vercel
echo =======================================================
echo.
echo Iniciando asistente de Vercel...
echo Si es la primera vez, se abrira tu navegador para iniciar sesion.
echo.
call npx vercel --prod
pause
