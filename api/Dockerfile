FROM node:16-alpine3.15

# Create app directory and copy app files
WORKDIR /app

# Expected behavior after solving paths
COPY dist .
COPY package.json .

# Install dependencies and build the app
RUN yarn install --prod --frozen-lockfile

ENV NODE_ENV production
EXPOSE ${PORT}

CMD ["yarn", "docker:serve"]