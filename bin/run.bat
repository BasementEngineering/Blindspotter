@echo off

REM Run script for Windows
set CONTAINER_NAME=blindspotter-app
set PORT=%1
if "%PORT%"=="" set PORT=3000

echo 🚀 Starting Blindspotter container on port %PORT%...

REM Stop existing container if running
for /f %%i in ('docker ps -q -f name=%CONTAINER_NAME% 2^>nul') do (
    echo ⏹️  Stopping existing container...
    docker stop %CONTAINER_NAME%
)

REM Remove existing container if exists
for /f %%i in ('docker ps -aq -f name=%CONTAINER_NAME% 2^>nul') do (
    echo 🗑️  Removing existing container...
    docker rm %CONTAINER_NAME%
)

REM Run new container
docker run -d --name %CONTAINER_NAME% -p %PORT%:3000 blindspotter

if %ERRORLEVEL% EQU 0 (
    echo ✅ Container started successfully!
    echo 🌐 Open http://localhost:%PORT% in your browser
    echo 📋 To stop: bin\stop.bat
) else (
    echo ❌ Failed to start container!
    pause
)