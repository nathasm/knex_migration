FROM node:0.10.35
MAINTAINER Nathan Smith <nathasm@gmail.com>

ADD package.json /src/package.json

RUN cd /src && npm install
RUN npm install -g gulp

WORKDIR /src

ADD . /src

CMD gulp mocha
