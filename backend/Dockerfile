FROM node:alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 8888
CMD ["yarn", "dev"]