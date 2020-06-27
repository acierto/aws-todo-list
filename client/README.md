## Run project for development
```shell script
yarn start
```

## Upload changes to AWS S3
```shell script
yarn build && aws s3 sync build s3://acierto-bucket
```

## Demo

http://acierto-bucket.s3-website-eu-west-1.amazonaws.com

