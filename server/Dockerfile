FROM node:alpine

COPY node_modules /opt/ticket/node_modules
COPY dist /opt/ticket/dist
COPY package.json /opt/ticket
COPY README.md /opt/ticket
COPY yarn.lock /opt/ticket

WORKDIR /opt/ticket

EXPOSE 4000

ENTRYPOINT ["/usr/local/bin/node", "dist/cli.js"]
CMD ["start"]
