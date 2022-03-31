FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY yarn.lock /app

RUN yarn install

# Bundle app source
COPY . /app

EXPOSE 3000
CMD [ "yarn", "start" ]