FROM oven/bun

ADD src src
ADD package.json package.json
ADD package-lock.json package-lock.json
ADD bun.lockb bun.lockb

RUN bun install

CMD bun src/index.ts


# FROM node:19-alpine


# ADD src src
# ADD package.json package.json
# ADD package-lock.json package-lock.json 

# RUN npm install

# CMD ["npm","run","dev"]
