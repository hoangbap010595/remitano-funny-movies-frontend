. ./frontend-evn.sh

echo "===> start docker: $APP_NAME"

docker-compose -f frontend-docker-compose.yml -p $APP_NAME down

sudo rm -rf "$APP_VOLUME_CODE_MOUNT_PATH"
sudo mkdir -p "$APP_VOLUME_CODE_MOUNT_PATH"

docker-compose -f frontend-docker-compose.yml -p $APP_NAME up --build -d

echo "===> removing old image"
docker rmi `docker images | grep "<none>" | awk {'print $3'}`