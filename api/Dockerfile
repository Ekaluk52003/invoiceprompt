FROM node:14-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY prisma ./prisma/


RUN yarn
RUN npx prisma generate

COPY . .




EXPOSE 8080
CMD [ "node", "dist/index.js" ]
USER node