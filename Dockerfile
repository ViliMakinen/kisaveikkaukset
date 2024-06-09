
FROM node:20-alpine3.18 as frontend

ENV NODE_ENV build

USER node

COPY --chown=node:node ./frontend /home/node/frontend

WORKDIR /home/node/frontend

RUN npm ci && npm run build

FROM node:20-alpine3.18 as backend

ENV NODE_ENV build

RUN apk update && apk upgrade

USER node

COPY --chown=node:node ./backend /home/node/backend

WORKDIR /home/node/backend

RUN npm ci && npm run build

FROM node:20-alpine3.18

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=backend /home/node/backend/package*.json /home/node/
COPY --from=backend /home/node/backend/node_modules/ /home/node/node_modules/
COPY --from=backend /home/node/backend/dist/ /home/node/dist/
COPY --from=backend /home/node/backend/prisma/ /home/node/prisma/
COPY --from=frontend /home/node/frontend/dist/kisaveikkaukset /home/node/dist/public

CMD ["node", "dist/src/main.js"]
