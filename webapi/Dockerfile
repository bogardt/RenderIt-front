FROM node:8.11.1
RUN mkdir -p /usr/src/webapi
WORKDIR /usr/src/webapi
ADD . /usr/src/webapi
RUN npm install --no-optional
RUN npm install -g nodemon --no-optional
EXPOSE 4000
CMD [ "npm", "start" ]