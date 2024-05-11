ARG NODE_VERSION=21.7.2

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

ENV PORT=8080
ENV DB_URL='mongodb+srv://huynambka:PassMongoDB1008@huynambka.e0yk43a.mongodb.net/mini-web'
ENV JWT_SECRET='jwtauthkey@#$'
ENV TOKEN_LIFETIME=1h

WORKDIR /usr/src/app

# Copy package.json and package-lock.json files into the image.
COPY package*.json ./
# Install dependencies.
RUN npm install

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 8080

# Run the application.
CMD npm start
