@echo off

REM Stop script for Windows
set CONTAINER_NAME=blindspotter-app

echo ⏹️  Stopping Blindspotter container...

REM Check if container is running and stop it
for /f %%i in ('docker ps -q -f name=%CONTAINER_NAME% 2^>nul') do (
    docker stop %CONTAINER_NAME%
    echo ✅ Container stopped successfully!
    goto :remove
)

echo ℹ️  No running container found with name: %CONTAINER_NAME%

:remove
REM Remove container if exists
for /f %%i in ('docker ps -aq -f name=%CONTAINER_NAME% 2^>nul') do (
    docker rm %CONTAINER_NAME%
    echo 🗑️  Container removed successfully!
)