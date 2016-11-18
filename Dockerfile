FROM node:6.9.1-alpine
MAINTAINER Stefan Siegl <stesie@brokenpipe.de>

ADD . /app
WORKDIR /app

RUN apk update && \
	apk add cairo && \
	apk add --virtual build-dependencies bash cairo-dev g++ make pkgconfig python && \
	npm install && \
	sh ./tools/build-phaser.sh && \
	npm run build && \
	apk del build-dependencies && \
	rm -rf /var/cache/apk/*

EXPOSE 3000

CMD [ "npm", "start" ]
