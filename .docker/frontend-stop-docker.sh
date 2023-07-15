. ./frontend-env.sh

echo "===> stop docker: $APP_NAME"

docker-compose -f frontend-docker-compose.yml -p $APP_NAME down