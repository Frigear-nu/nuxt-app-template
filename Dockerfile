FROM node:24-slim AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.1.3 --activate

ENV CI=true
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

# Must be built/prepared before deploy in monorepo!
#RUN pnpm --filter "@inventory/integration-ambrosia" exec nuxt prepare


FROM base AS dev

EXPOSE 3000
CMD ["pnpm",  "dev", "--host", "0.0.0.0", "--port", "3000"]


FROM base AS prod

RUN pnpm exec nuxt prepare
RUN NODE_OPTIONS="--max-old-space-size=4096" pnpm build


EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
