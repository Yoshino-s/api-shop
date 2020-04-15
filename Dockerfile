FROM node:lts-alpine as builder

WORKDIR /app

COPY ./* /app/

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/' /etc/apk/repositories \
    && apk update \
    && yarn config set registry https://registry.npm.taobao.org/ \
    && yarn \
    && yarn build:single

FROM node:lts-alpine as prod

WORKDIR /app

COPY --from=0 /app/dist-single/index.js /app/

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/' /etc/apk/repositories \
    && apk update \
    && apk add libwebp-tools \
    && mkdir /app/vendor/ \
    && ln /usr/bin/cwebp /app/vendor/cwebp

EXPOSE 3000

ENTRYPOINT [ "node", "/app/index.js" ]