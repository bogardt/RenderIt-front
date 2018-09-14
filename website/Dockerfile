FROM node:8.11.1
RUN mkdir -p /usr/src/website
WORKDIR /usr/src/website
ADD . /usr/src/website
RUN npm install --no-optional
RUN npm install -g nodemon --no-optional
EXPOSE 3000
CMD [ "npm", "start" ]