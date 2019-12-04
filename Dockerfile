FROM node/12-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
CMD ["yarn", "dev"]
