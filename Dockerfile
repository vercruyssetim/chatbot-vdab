FROM node:6.7-onbuild

ENV HTTP_PROXY 'http://vdabprdproxy.vdab.be:8080'
ENV http_proxy 'http://vdabprdproxy.vdab.be:8080'
ENV HTTPS_PROXY 'http://vdabprdproxy.vdab.be:8080'
ENV https_proxy 'http://vdabprdproxy.vdab.be:8080'

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY . /usr/src/app

RUN npm install --no-color

EXPOSE 3000
CMD ["npm","start"]