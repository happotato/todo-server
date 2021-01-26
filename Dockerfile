FROM alpine:3.7

RUN apk add nodejs
RUN apk add yarn

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production
COPY . .

EXPOSE 80
ENV PORT=80
ENTRYPOINT ["node", "index.js"]
