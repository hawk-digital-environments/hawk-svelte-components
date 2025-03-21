# =====================================================
# APP service
# =====================================================
# APP - ROOT
# -----------------------------------------------------
FROM node:23-alpine AS app_root

ARG APP_ENV=prod

ENV APP_ENV=${APP_ENV}

ARG DOCKER_RUNTIME=docker

ARG DOCKER_GID=1000

ARG DOCKER_UID=1000

WORKDIR /var/www/html


# -----------------------------------------------------
# APP - DEV
# -----------------------------------------------------
FROM app_root AS app_dev

ENV DOCKER_RUNTIME=${DOCKER_RUNTIME:-docker}

ENV APP_ENV=dev

# Add basics
RUN --mount=type=cache,id=apk-cache,target=/var/cache/apk rm -rf /etc/apk/cache && ln -s /var/cache/apk /etc/apk/cache && \
    apk update && apk upgrade && apk add \
    sudo \
    bash \
    curl

# Recreate the www-data user and group with the current users id
RUN --mount=type=cache,id=apk-cache,target=/var/cache/apk rm -rf /etc/apk/cache && ln -s /var/cache/apk /etc/apk/cache && \
    apk update && apk upgrade && apk add shadow \
    && (deluser $(getent passwd ${DOCKER_UID} | cut -d: -f1) || true) \
    && (userdel -r www-data || true) \
    && (groupdel -f www-data || true) \
    && groupadd -g ${DOCKER_GID} www-data \
    && adduser -u ${DOCKER_UID} -D -S -G www-data www-data

COPY docker/node/node.entrypoint.dev.sh /usr/bin/app/boot.sh

RUN chmod +x /usr/bin/app/boot.sh

ENTRYPOINT /usr/bin/app/boot.sh

USER www-data


# -----------------------------------------------------
# APP - PROD
# -----------------------------------------------------
FROM app_root AS app_prod

# Add the app sources
COPY --chown=www-data:www-data ./app .

# Ensure correct permissions on the binaries
RUN find /var/www/html/bin -type f -iname "*.sh" -exec chmod +x {} \;

USER root

ENTRYPOINT [ "npm", "run", "prod" ]