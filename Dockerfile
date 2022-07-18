# Name the node stage "builder"
FROM node:14 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY ./server .
COPY ./app .
# install node modules and build assets
RUN npm install -g json-server http-server
RUN npm install && npm run test && npm run build
# EXPOSE 80
ADD server.sh ./server.sh
# ADD db.sh ./db.sh
RUN chmod +x ./server.sh
# RUN chmod +x ./db.sh
CMD ["./server.sh"]
