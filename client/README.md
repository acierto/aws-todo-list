## Run project for development
```shell script
yarn start
```

## Upload changes to AWS S3
```shell script
yarn build && aws s3 sync build s3://acierto-bucket
```
