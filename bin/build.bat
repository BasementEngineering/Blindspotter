@echo off

REM Build script for Windows
REM Change to project root directory
cd /d "%~dp0\.."

echo 🔨 Building Blindspotter Docker image...

REM Build the Docker image
docker build -f Dockerfile -t blindspotter .

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build completed successfully!
    echo 📋 To run the container: bin\run.bat
) else (
    echo ❌ Build failed!
    pause
)