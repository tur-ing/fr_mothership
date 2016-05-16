FROM node:5.10.1

WORKDIR /home/frisches

COPY . /home/frisches/mothership

RUN cd ./mothership && npm install

ENV NODE_ENV production

WORKDIR /home/frisches/mothership

EXPOSE 3000

CMD ["npm run start-mothership"]