FROM node:20

WORKDIR /app

LABEL name = 'eleni gray'

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]