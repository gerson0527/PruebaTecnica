@echo off
echo Resetting Medical System (WARNING: This will delete all data)...
echo.
set /p confirm="Are you sure? (y/N): "
if /i "%confirm%" neq "y" (
    echo Operation cancelled.
    pause
    exit /b
)

echo.
echo Stopping services...
docker-compose down -v

echo.
echo Removing images...
docker-compose down --rmi all

echo.
echo Starting fresh...
docker-compose up -d

echo.
echo Medical System reset and started!
echo.
pause
