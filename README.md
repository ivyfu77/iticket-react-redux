# REACT Skeleton With Redux and Compiler
    Use this is as a basis to start developing a react app, on going development

## Docker

If you do not want to use docker on your system skip this step, but it is recommended that
you use docker, to avoid conflicting dependencies

To start the docker development environment with webpack watch run:

```
docker-compose up
```

On a separate terminal run: 

```
docker-compose exec web npm start
```

This will start the server and serve your app at localhost


## Instructions
Run the following commands to start developing

### To Install the dependencies
```
npm install
```
### To compile all js, jsx and less and have watch running in background
```
npm run dev
```
### To compile and minify all js, jsx and less for production 
```
npm run prod
```
All compiled output is available in 
```
dist/index.js
```
```
dist/index.css
```