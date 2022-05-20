FROM node:12 AS development

RUN mkdir -p /vueback
WORKDIR ./vueback
COPY package*.json ./
COPY . .
EXPOSE 8000
RUN npm install
RUN npm run build
