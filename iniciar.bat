@echo off
title Sistema Experto POS de Ventas - NEGIRA S.A.
echo =======================================================
echo    Iniciando NEGIRA S.A. - Sistema Experto POS
echo =======================================================
echo.

if not exist node_modules (
    echo Instalando dependencias necesarias...
    call npm install
)

echo Levantando servidor de desarrollo...
call npm run dev
pause
