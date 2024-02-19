# Use a builder
FROM node:16-bookworm-slim as Builder
LABEL maintainer="contact@kalisio.xyz"

# git is required to pull some node packages from github
RUN DEBIAN_FRONTEND=noninteractive && \
  apt-get update && \
  apt-get --no-install-recommends --yes install \
    ca-certificates git

COPY . /opt/kalisio

# Setup kli
WORKDIR /opt/kalisio/kli
RUN yarn install

# Setup app
WORKDIR /opt/kalisio/
RUN node /opt/kalisio/kli /opt/kalisio/kli.js --install

# Copy to final container
FROM node:16-bookworm-slim
LABEL maintainer="contact@kalisio.xyz"

ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

COPY --from=Builder --chown=node:node /opt/kalisio /opt/kalisio
# From now on, run stuff as 'node'
USER node

# Link the modules
WORKDIR /opt/kalisio
RUN node /opt/kalisio/kli /opt/kalisio/kli.js --link

# Run the app
WORKDIR /opt/kalisio/${APP}
EXPOSE 8081
CMD [ "yarn", "prod" ]
