@echo off
title Subir a GitHub - Sistema Experto POS Negira S.A.
echo =======================================================
echo    Subir Proyecto a GitHub
echo =======================================================
echo.
echo Ya tienes el repositorio Git listo y con el commit inicial.
echo.
set /p REPO_URL="Pega aqui la URL de tu repositorio de GitHub (ej. https://github.com/tu-usuario/tu-repo.git): "

if "%REPO_URL%"=="" (
    echo No ingresaste ninguna URL. Operacion cancelada.
    pause
    exit /b
)

echo.
echo Conectando con GitHub...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo Subiendo ramas y codigo a GitHub...
git push -u origin main

echo.
echo =======================================================
echo    Proceso terminado con exito!
echo =======================================================
pause
