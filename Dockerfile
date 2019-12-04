FROM node:12
RUN mkdir -p /app
WORKDIR /app
COPY . .
CMD ["yarn", "serve-prod"]
EXPOSE 3000
