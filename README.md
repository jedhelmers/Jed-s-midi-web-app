# Jed's midi web app
 midi web app

## Deploying to GCP
Build the docker image
```docker build -t midi_project .```

Push image to GCP
```
gcloud auth configure-docker
docker tag midi_project gcr.io/YOUR_PROJECT_ID/midi_project
docker push gcr.io/YOUR_PROJECT_ID/midi_project
```

## Local - http://localhost:8000
```
docker-compose build
docker-compose run web python manage.py migrate

docker-compose up
docker-compose down
```