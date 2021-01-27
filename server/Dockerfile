FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
COPY envGenerator.sh ./
COPY randomString.sh ./
COPY mockProducts.js ./

RUN ./envGenerator.sh
RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]
