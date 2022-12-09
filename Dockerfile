FROM snakepy/laravel-dev-image:php8.1-1df0d5dc1278855189227f766c49569395c83e56

WORKDIR /app

COPY .docker/xdebug.ini /etc/php/7.4/cli/conf.d/99-xdebug.ini

COPY . .

RUN npm install
