FROM node:lts-alpine

WORKDIR /app

COPY dist-single/index.js /app/

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/' /etc/apk/repositories \
    && apk update \
    && apk add libwebp-tools \
    && mkdir /app/vendor/ \
    && ln /usr/bin/cwebp /app/vendor/cwebp

EXPOSE 3000

ENTRYPOINT [ "node", "/app/index.js" ]