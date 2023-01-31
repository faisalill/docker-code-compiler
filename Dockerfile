FROM ubuntu

RUN apt-get update
RUN apt-get install -y nodejs npm
RUN apt-get upgrade -y
RUN apt-get install -y build-essential

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
