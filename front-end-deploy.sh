cd remitano-funny-movies-frontend

git restore .docker/frontend-evn.sh
git restore .docker/frontend-start-docker.sh

git pull

cd .docker
chmod +x frontend-evn.sh
chmod +x frontend-start-docker.sh

./frontend-start-docker.sh