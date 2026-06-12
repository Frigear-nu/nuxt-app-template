# frigear-nuxt-app-template

## Quick Documentation Links

- [Nuxt UI](https://ui.nuxt.com/docs/getting-started) / [Nuxt UI Components](https://ui.nuxt.com/docs/components)
- [Nuxt Hub](https://hub.nuxt.com/docs/getting-started)
- [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils)
- [Nuxt Documentation](https://nuxt.com/docs/4.x/getting-started/introduction)

## Quick Start

```bash [Terminal]
pnpm create nuxt@latest -t gh:Frigear-nu/nuxt-app-template <project-name>
```

Enter the directory:

```bash
cd <project-name>
```

## Setup

Configure the .env file:

```bash
cp .env.example .env
```

> TO USE OAUTH: Create a new oauth app in frigear -> admin -> oauth and use "http://locahost:3000" as the website url
> and "http://localhost:3000/auth/frigear" as the login url.

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## DB / Migrations

### If you add/ change tables in [`schema.sqlite.ts`](./server/db/schema.sqlite.ts)

Make sure you change as many things as you think you need, then run:

```bash
pnpm db:generate
```

### Applying the changes

```bash
pnpm db:migrate
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you
are good to go.
