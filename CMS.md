# Cranton Sanity CMS

Set these variables in `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (normally `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_TOKEN` (server-side read/write token for seeding)

Run `npm run dev` and open `/studio` to edit Sanity documents. Run `npm run seed` once to upload the existing images from `public/` to the Sanity asset library and create the initial Header, Footer, and route documents. The seed script never deletes or modifies local images.

The current website remains available with its local fallback content when Sanity is not configured or a document is unavailable. Page sections are modeled with editable headings, paragraphs, images, buttons, links, and repeatable items.
