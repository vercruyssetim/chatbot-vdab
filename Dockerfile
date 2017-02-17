FROM node:6.7-onbuild

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

EXPOSE 3000
CMD ["npm","start"]