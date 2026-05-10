# Tulsi Tales Shopify Theme

This repository now keeps a standard Shopify theme structure alongside the legacy root-level working files.

## Canonical theme source

Treat these folders as the source of truth for the live Shopify theme:

- `layout/`
- `templates/`
- `sections/`
- `assets/`
- `config/`
- `snippets/`

These folders were synced from the live Shopify theme `Ayus AI Prototype (WIP)` (theme id `182982246700`).

## Current status

The storefront UI is intentionally being preserved while backend architecture, editability, SEO, and developer maintainability are cleaned up.

Legacy root-level files like `ayus-product-main.liquid`, `ayus-collection.liquid`, and `theme.liquid` still exist for backward compatibility with older helper scripts, but new work should prefer the standard Shopify folders above.

## Main page mapping

- Home page: `templates/index.json`
- Product page: `templates/product.json`
- Collection page: `templates/collection.json`
- Our Story page: `templates/page.our-story.json`
- Contact page: `templates/page.contact.json`
- Policy pages:
  - `templates/page.policy.json`
  - `templates/page.privacy.json`
  - `templates/page.refund.json`
  - `templates/page.shipping.json`
  - `templates/page.terms.json`

## Key custom sections

- Product: `sections/ayus-product-main.liquid`
- Product recommendations: `sections/ayus-product-recommendations.liquid`
- Product reviews: `sections/ayus-product-reviews.liquid`
- Collection: `sections/ayus-collection.liquid`
- Cart drawer: `sections/ayus-cart-drawer.liquid`
- Header / Footer:
  - `sections/ayus-header.liquid`
  - `sections/ayus-footer.liquid`
- Our Story sections:
  - `sections/ayus-story-hero.liquid`
  - `sections/ayus-story-quote.liquid`
  - `sections/ayus-story-split.liquid`
  - `sections/ayus-story-text.liquid`
  - `sections/ayus-story-values.liquid`
  - `sections/ayus-story-faq.liquid`
  - `sections/ayus-story-cta.liquid`

## Sync and deploy

### Sync the live Shopify theme into this repo

```bash
node scripts/shopify-theme-sync.js
```

### Deploy the standard folder structure back to Shopify

```bash
node scripts/shopify-theme-deploy.js
```

### Sync canonical files back into the legacy root-level mirrors

Use this after editing canonical `sections/` or `templates/` files when older helper scripts still expect the legacy root-level copies.

```bash
node scripts/sync-legacy-mirrors.js
```

You can also target specific mirrors:

```bash
node scripts/sync-legacy-mirrors.js ayus-product-main.liquid product.json
```

## Notes for developers

- Keep storefront appearance stable unless a change is explicitly requested.
- Prefer section schema settings and JSON templates over hardcoded content when extending editability.
- Avoid adding new one-off deploy scripts when the standard deploy flow can be used.
- Judge.me integrations should be handled carefully because the current theme contains both app-block and custom-fallback review logic.
