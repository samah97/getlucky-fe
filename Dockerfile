# Stage 1

FROM node:21.5.0 as build-step

# RUN mkdir -p /app

# RUN npm install -g yarn

# WORKDIR /app
WORKDIR /opt/ng
COPY  package.json yarn.lock ./

# COPY package.json yarn.lock /app/

RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./

RUN ng build --configuration production
# COPY . /app

# RUN npm run build --prod
# RUN yarn build

# Stage 2
FROM nginx:1.25.3-alpine

# COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /opt/ng/dist/getlucky-app/browser /usr/share/nginx/html

# COPY --from=build-step /app/dist/getlucky-app /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/nginx.conf
