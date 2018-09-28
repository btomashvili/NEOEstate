
# WalkThru-Front Readme

Quick Start
-----------

```shell
$ git clone https://github.com/ShowMojo/mywalkthru-frontend.git
$ cd mywalkthru-frontend
$ npm install
$ npm start
```

Commands
--------

|Script|Description|
|---|---|
|`npm run dev`| Run development server with webpack-dev-server @ `localhost:3000`|
|`npm run build`| Test, and build the application to `./dist`|
|`npm start`| Start production ready app with pm2 from `./dist` @ `localhost:8080`|
|`npm run lint`| Run ESLint on `./src`|
|`docker-compose up -d --build`| Run dockerized development server with webpack-dev-server @ detached mode`localhost:9000`|
|`docker-compose up`| Run dockerized development server with webpack-dev-server `localhost:9000`|
