export DOCKER_NETWORK='nginx-proxy'

export ADMIN_API_HOST='rfm-demo-fe.thocbeauty.com'
export VIRTUAL_NETWORK='nginx-proxy'
export VIRTUAL_PORT='3000'
export LETSENCRYPT_ADMIN_API_HOST="$ADMIN_API_HOST"
export LETSENCRYPT_EMAIL='remitano@admin.com'

export APP_NAME='remitano-funny-movies-frontend'
export APP_ENV='dev'
export APP_KEY='base64:3/p6L7rrKi2eVFr3pyMAe0jO2Krv1R9Q9oOsi0463fE:'
export APP_DEBUG='true'
export APP_URL="https://${ADMIN_API_HOST}"
export REDIRECT_HTTPS='true'

export APP_VOLUME_CODE_MOUNT_PATH="/home/applications/data/${APP_NAME}/code"

export REACT_APP_API_URL="https://rfm-demo-be.thocbeauty.com/graphql"
export REACT_APP_WEBSOCKET_URL="https://rfm-demo-be.thocbeauty.com:3003"