# Storyblok Setup

This project now supports Storyblok as a server-side CMS source with a strict fallback to the current in-repo content.

## What this means

- If Storyblok is not configured, the site keeps showing the current text and images.
- If a Storyblok story is only partially filled, missing fields still fall back to the current local content.
- Storyblok asset objects are normalized to image URLs automatically.
- Storyblok remote images are allowed in `next.config.ts`.

## Environment variables

Add these to `.env.local`:

```env
STORYBLOK_PREVIEW_TOKEN=your_storyblok_preview_token
STORYBLOK_CONTENT_VERSION=published
```

## Local preview URL for Storyblok

Storyblok only accepts `https://` preview URLs.

This project now includes:

```bash
npm run dev:https
```

That starts Next.js with local HTTPS using the built-in `--experimental-https` flag available in your installed Next.js version.

Use this preview URL in Storyblok:

```txt
https://localhost:3000/
```

If your browser shows a certificate warning the first time, open `https://localhost:3000/` manually and accept the local certificate once before testing the Storyblok preview iframe.

Use `draft` for preview content if you want unpublished Storyblok content to render locally:

```env
STORYBLOK_CONTENT_VERSION=draft
```

## Current stories wired in code

- `site-settings`
- `home`

`site-settings` should contain:

- `navbar`
- `footer`

`home` should contain:

- `hero`
- `services`
- `buildingBlocks`
- `statsSection`
- `whyChooseUs`
- `insightsSection`

## Image handling

For image fields, either of these work:

1. Storyblok asset fields
2. Plain URL string fields

Asset fields are recommended. The integration converts Storyblok asset objects to their `filename` URL automatically.

## Safe rollout

Recommended rollout order:

1. Create the `site-settings` story in Storyblok.
2. Create the `home` story in Storyblok.
3. Copy values section by section.
4. Verify each section visually.

Because local fallback remains active, incomplete Storyblok content will not remove existing images or text from the site.
