FROM node:17 as build

WORKDIR /client

# https://stackoverflow.com/questions/68143562/create-react-app-fails-to-build-inside-docker
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]