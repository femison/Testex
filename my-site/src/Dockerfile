# Используем Node.js, в котором уже есть npm
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Добавляем node_modules в PATH
ENV PATH /app/node_modules/.bin:$PATH

# Копируем зависимости
COPY package.json ./
COPY package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходники
COPY . ./

# Запускаем dev-сервер
CMD ["npm", "start"]
