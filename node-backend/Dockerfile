# Dockerfile para Node.js backend
FROM node:20-slim

# Crear directorio de la app
WORKDIR /app 

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 8000

# Comando por defecto
CMD ["npm", "run", "start"]
