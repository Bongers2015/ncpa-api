FROM node:12
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn install
CMD ["yarn", "serve-prod"]
EXPOSE 3000
