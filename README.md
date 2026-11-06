# Sit Management

A TypeScript and Vite project-management dashboard starter, designed for static hosting on GitHub Pages.

## Code structure

The app uses a small MVC-inspired structure with constructor injection:

- `src/controllers/AppController.ts` coordinates login, dashboard, and sign-out.
- `src/views/` contains the login and dashboard UI classes.
- `src/auth/` contains the authentication, password-hashing, and session-storage classes.
- `src/models/User.ts` defines the account and credential types.
- `src/main.ts` creates the configuration and connects the objects.

See [`project-map.html`](./project-map.html) for the sign-in flow and site map.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`. The build inlines the dashboard's JavaScript and CSS into `dist/index.html`, so the dashboard is a single HTML file ready to upload to GitHub Pages. `dist/project-map.html` is included as a separate optional page. Configure GitHub Pages to deploy the `dist/` directory.

## Starter account

- Username: `Admin`
- Password: `88888888`

The password is verified with PBKDF2-SHA-256 (310,000 iterations) and a per-project salt. A successful sign-in lasts for the current browser tab session.

## Security note

GitHub Pages is static hosting, so all frontend code and the stored password hash are public. This login is only a convenience gate; it cannot protect private data or securely authorize users. Do not store sensitive project information in public GitHub Issues or rely on this frontend check for access control. A trusted backend or another server-side identity provider is required for real authentication and private data.
