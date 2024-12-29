# Use the official Node.js image.
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build the TypeScript code
RUN npm run build

# Command to run the app
CMD [ "node", "dist/index.js" ]
