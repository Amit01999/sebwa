# SEBWA API

Express + MongoDB (Mongoose) + Cloudinary backend for the SEBWA CMS. Deployed as its own Vercel project, separate from the public frontend.

## Local development

```bash
npm install
cp .env.example .env   # then fill in real values, see below
npm run dev             # starts on http://localhost:4000 (or PORT)
```

No MongoDB Atlas or Cloudinary account yet? Run the whole stack against a throwaway in-memory database instead — no `.env` needed:

```bash
npm run dev:memdb
```

This boots an in-memory MongoDB, seeds an admin user (`admin@example.com` / `dev-password-123`), migrates the site's transcribed content into it, and starts the API. Data is lost when the process exits — useful for trying the admin dashboard and public API shape without touching real infrastructure.

Other scripts:

| Script | Purpose |
|---|---|
| `npm run build` | Type-checks and compiles to `dist/` (not used for Vercel deploys — see below) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run smoke` | Automated smoke test (auth, CSRF, page CRUD, forms) against an in-memory DB — no real credentials needed |
| `npm run seed:admin` | Creates the first admin user from `ADMIN_SEED_EMAIL`/`ADMIN_SEED_PASSWORD` in `.env` |
| `npm run seed:media` | Uploads `../src/assets/**` to Cloudinary, tagged for the migration script to find |
| `npm run migrate` | Upserts the transcribed site content (`src/scripts/seed-data/**`) into MongoDB, publishing all 19 pages |

## Required environment variables

See `.env.example` for the full annotated list. Summary:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas (or compatible) connection string |
| `JWT_SECRET` | Long random string signing admin session tokens (`openssl rand -hex 32`) |
| `JWT_EXPIRES_IN` | Admin session lifetime, default `7d` |
| `FRONTEND_ORIGIN` | Exact origin(s) of the deployed frontend, comma-separated — drives CORS |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | From your Cloudinary dashboard |
| `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` / `ADMIN_SEED_NAME` | Only read by `npm run seed:admin`, never at request time |

## One-time setup against real infrastructure

1. Create a free MongoDB Atlas cluster, get its connection string, set `MONGODB_URI`.
2. Create a free Cloudinary account, get cloud name / API key / API secret from the dashboard, set the three `CLOUDINARY_*` vars.
3. `npm run seed:admin` — creates your first admin login.
4. `npm run seed:media` — uploads the site's current images to Cloudinary.
5. `npm run migrate` — publishes all 19 pages, navigation, settings and the shared course-availability table. Safe to re-run (idempotent upserts).
6. Log into `/admin/login` on the frontend with the seeded admin credentials.

## Deploying to Vercel

This is a **separate Vercel project** from the frontend (the frontend's Nitro build already owns its own `.vercel/output`, so this backend can't live inside that same project's build).

1. Create a new Vercel project, **Root Directory** set to `server/`, Framework Preset **Other**.
2. Add all the environment variables above in the Vercel project's settings (`FRONTEND_ORIGIN` = your deployed frontend's URL).
3. Deploy. `api/index.ts` is picked up by Vercel's zero-config Node builder automatically (`vercel.json` here just rewrites everything to it).
4. Set the frontend project's `VITE_API_BASE_URL` to this backend project's deployed URL, and redeploy the frontend.
5. Run `npm run seed:admin`, `npm run seed:media`, `npm run migrate` locally with `.env` pointed at the **production** `MONGODB_URI`/Cloudinary credentials (or run them from any machine with network access to Atlas — they're plain Node scripts, not Vercel functions).

## Architecture notes

- **Auth**: JWT in an httpOnly cookie (`SameSite=None; Secure` in production, `Lax` in dev). CSRF protection is a token embedded in the JWT and echoed back in the login/`/me` response body — not a second cookie — so it works regardless of whether the frontend and backend end up same-site or genuinely cross-site. See `src/services/token.service.ts` and `src/middleware/requireCsrf.ts`.
- **Mongo connections** are cached on `globalThis` (`src/db/connect.ts`) so warm serverless invocations reuse the connection instead of reconnecting per request.
- **Validation**: `Section.data` and `FormSubmission.fields` are schema-less (`Mixed`) at the Mongoose layer; `src/validation/*.schema.ts` (Zod) is the only source of truth for their shape. Changing a section type's fields means updating the Zod schema here, the matching admin editor component, and the public renderer component — three places kept deliberately in sync, not automatically.
- **Media deletion safety**: deleting a `MediaAsset` first reverse-scans every `Page`/`SiteSettings` document for that asset's id (`src/services/mediaReference.service.ts`) and blocks the delete (409, listing what references it) unless `force=true` is passed. This is a best-effort scan over schema-less JSON, not a relational foreign-key guarantee.
