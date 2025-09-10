@echo off
echo Starting Medical System with Docker...
echo.

echo Starting database and backend...
docker-compose up -d postgres backend

echo.
echo Waiting for services to be ready...
timeout /t 10 /nobreak > nul

echo.
echo Starting frontend...
docker-compose up -d frontend

echo.
echo All services started!
echo.
echo Frontend: http://localhost:4200
echo Backend API: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo Database Admin: http://localhost:8080
echo.
pause
