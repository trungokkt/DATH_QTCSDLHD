FROM node:14.19-alpine3.15
 
WORKDIR /usr/src/app/frontend
 
COPY package*.json .
 
RUN npm install
 
COPY . .
 
CMD [ "npm", "start" ]