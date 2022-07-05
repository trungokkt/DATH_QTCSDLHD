FROM node:12.18.1
 
WORKDIR /usr/src/app/gateway
 
COPY package*.json .
 
RUN npm install
 
COPY . .
 
CMD [ "npm", "start" ]