# frigear-nuxt-app-template


## Quick Start

```bash [Terminal]
pnpm create nuxt@latest -t gh:Frigear-nu/nuxt-app-template <project-name>
```

## Setup

Configure the .env file:
```bash
cp .env.example .env
```

> Create a new oauth app in frigear -> admin -> oauth and use "http://locahost:3000" as the website url and "http://localhost:3000/auth/frigear" as the login url.

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
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

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.
