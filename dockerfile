FROM node:6 as builder

COPY public/ /home/node/app/public
COPY src/ /home/node/app/src
COPY package.json /home/node/app/

WORKDIR /home/node/app

RUN npm install

RUN npm run build


FROM nginx

COPY docker/default.conf /etc/nginx/conf.d/

COPY --from=builder /home/node/app/build /usr/share/nginx/html

# docker build -t ecb/cap-frontend .
