FROM node:12-buster-slim
LABEL maintainer="contact@kalisio.xyz"

ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Install curl
RUN apt-get update && apt-get -y install curl

# Install NVM and Node 12.16
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash && \
  export NVM_DIR="$HOME/.nvm" && \
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
  nvm install 12.16 && \
  nvm use 12.16

# Copy the built artefact.
# Warning - 
# We could do ADD and let Docker uncompress automatically the archive but we reach log limit in Travis.
# So we copy the archive and uncompress it usin tar without the verbose mode
COPY kalisio.tgz /opt/.
WORKDIR /opt
RUN tar zxf kalisio.tgz && rm kalisio.tgz

# Link the modules
WORKDIR /opt/kalisio
RUN node . ${APP}.js --link

# Run the app
WORKDIR /opt/kalisio/${APP}
EXPOSE 8081
CMD [ "yarn", "prod" ]
