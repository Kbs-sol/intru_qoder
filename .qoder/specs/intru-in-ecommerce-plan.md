# intru.in E-Commerce Rebuild Plan

## Decision: Replace Next.js with Astro + Alpine.js

**Why Astro over Next.js for 6 products:**
- Ships zero JavaScript by default (vs ~80KB+ React runtime)
- Static HTML pages = instant loads, perfect SEO, Lighthouse 95+
- Alpine.js (~15KB) handles interactive parts (cart, auth modals) as lightweight islands
- First-class Cloudflare Pages adapter with D1/R2 bindings
- File-based routing, Tailwind support, TypeScript - familiar DX
- Builds in seconds (6 pages), well within 500 builds/mo free limit

**What we reuse from the existing codebase:**
- `schema.sql` (D1 database schema - needs `sale_price` column added)
- Product data from `lib/product-service.ts` (6 products with names, prices, descriptions, image URLs)
- Brand identity (colors, fonts, letter-spacing, CSS animations from `globals.css`)
- Legal page content (privacy, terms, returns, shipping)
- Brand story content from about page
- Tailwind design tokens

---

## Tech Stack

| Layer | Technology | Free Tier |
|-------|-----------|-----------|
| Framework | Astro 5 + Alpine.js | Open source |
| Styling | Tailwind CSS 4 | Open source |
| Database | Cloudflare D1 (SQLite) | 5GB, 5M reads/day |
| Hosting | Cloudflare Pages | Unlimited bandwidth, 500 builds/mo |
| Images | Cloudflare R2 | 10GB storage, 10M reads/mo |
| Payments | Razorpay (REST API) | No monthly fee, 2% per txn |
| Auth (customers) | Google OAuth + email/password | Free |
| Auth (admin) | Password (`intru@27`) + future email allowlist | N/A |
| Icons | Lucide (SVG) | Open source |
| Animations | CSS keyframes (reuse existing) | N/A |

**Monthly cost: Rs 0** (Razorpay charges per transaction only)

---

## Project Structure

```
intru_in/                          (rebuild in-place, remove Next.js files)
├── src/
│   ├── pages/
│   │   ├── index.astro            # Homepage: hero, gallery, featured products
│   │   ├── products/
│   │   │   ├── index.astro        # All 6 products grid
│   │   │   └── [id].astro         # Product detail (SSR from D1)
│   │   ├── cart.astro             # Cart page (Alpine.js)
│   │   ├── checkout.astro         # Checkout + Razorpay
│   │   ├── about.astro            # Brand story (SEO-optimized)
│   │   ├── legal/
│   │   │   ├── privacy.astro      # Privacy policy
│   │   │   ├── terms.astro        # Terms & conditions
│   │   │   ├── returns.astro      # Returns & exchanges
│   │   │   └── shipping.astro     # Shipping policy
│   │   ├── auth/
│   │   │   ├── login.astro        # Customer login (Google + email/password)
│   │   │   └── callback.astro     # Google OAuth callback
│   │   ├── admin/
│   │   │   ├── login.astro        # Admin login (password: intru@27)
│   │   │   ├── index.astro        # Dashboard: orders, revenue
│   │   │   ├── products.astro     # CRUD products
│   │   │   ├── pages.astro        # Edit legal/content pages
│   │   │   └── orders.astro       # View/manage orders
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── google.ts      # Google OAuth initiate
│   │       │   ├── google-callback.ts
│   │       │   ├── login.ts       # Email/password login
│   │       │   ├── register.ts    # Email/password signup
│   │       │   └── logout.ts      # Clear session
│   │       ├── admin/
│   │       │   ├── login.ts       # Admin password check
│   │       │   ├── products.ts    # Product CRUD
│   │       │   ├── pages.ts       # Page content CRUD
│   │       │   └── upload.ts      # R2 image upload
│   │       ├── orders/
│   │       │   ├── create.ts      # Create Razorpay order
│   │       │   └── verify.ts      # Verify payment signature
│   │       └── products.ts        # Public: list products
│   ├── layouts/
│   │   ├── BaseLayout.astro       # Nav + footer + meta tags + Alpine.js init
│   │   └── AdminLayout.astro      # Admin sidebar + auth guard
│   ├── components/
│   │   ├── Navigation.astro       # Header: logo, nav links, cart icon, login
│   │   ├── Footer.astro           # Footer: links, social, newsletter
│   │   ├── ProductCard.astro      # Product card with quick-add button
│   │   ├── CartDrawer.astro       # Slide-out cart (Alpine.js)
│   │   ├── LoginModal.astro       # Google + email login modal (Alpine.js)
│   │   ├── HeroSection.astro      # Homepage hero with animations
│   │   ├── GalleryMarquee.astro   # Infinite scroll gallery (CSS-only)
│   │   └── SEOHead.astro          # JSON-LD structured data
│   ├── lib/
│   │   ├── db.ts                  # D1 query helpers
│   │   ├── auth.ts                # JWT create/verify, session helpers
│   │   ├── razorpay.ts            # Razorpay REST API (no SDK, uses fetch)
│   │   ├── r2.ts                  # R2 upload helper
│   │   └── utils.ts               # formatPrice, generateId, cn()
│   ├── scripts/
│   │   └── cart-store.js          # Alpine.js cart store (localStorage)
│   └── styles/
│       └── global.css             # Tailwind + reused CSS animations
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── schema.sql                     # D1 schema (reused + sale_price added)
├── seed.sql                       # Insert 6 products + legal page content
├── astro.config.mjs
├── tailwind.config.mjs
├── wrangler.toml                  # D1 + R2 bindings
├── package.json
├── tsconfig.json
└── .env.example
```

---

## Implementation Steps (ordered by dependency)

### Step 1: Project Init & Config
- Remove existing Next.js files (package.json, next.config.ts, app/, etc.)
- Init Astro project with `npm create astro@latest -- --template minimal`
- Install: `@astrojs/cloudflare`, `@astrojs/tailwind`, `@astrojs/sitemap`, `alpinejs`, `@types/alpinejs`, `lucide-static`, `nanoid`
- Configure `astro.config.mjs`: output `hybrid`, Cloudflare adapter with D1/R2 bindings
- Configure `tailwind.config.mjs`: reuse existing colors (black, white, #d73f3f), fonts (Outfit, Inter), letter-spacing
- Copy CSS animations from existing `globals.css` into `src/styles/global.css`
- Setup `wrangler.toml` with D1 database binding + R2 bucket binding

### Step 2: Database Setup
- Update `schema.sql`: add `sale_price REAL` column to products table, add `password_hash TEXT` to users table
- Create `seed.sql`: INSERT the 6 products + 4 legal pages (privacy, terms, returns, shipping)
- Create D1 database: `npx wrangler d1 create intru-in-db`
- Run schema: `npx wrangler d1 execute intru-in-db --file=schema.sql`
- Run seed: `npx wrangler d1 execute intru-in-db --file=seed.sql`

### Step 3: Layouts & Core Components
- `BaseLayout.astro`: HTML skeleton, Google Fonts (Outfit + Inter), Tailwind, Alpine.js CDN script, global styles, meta tags (title, description, OG, canonical), slot for page content
- `Navigation.astro`: Fixed top nav with "intru" logo, links (Shop, About), cart icon with count badge (Alpine.js `$store.cart.count`), login/user button
- `Footer.astro`: Brand info, quick links, legal links, social (Instagram), newsletter form
- `SEOHead.astro`: Reusable JSON-LD generator for Product, Organization, BreadcrumbList schemas

### Step 4: Cart System (Alpine.js)
- `src/scripts/cart-store.js`: Alpine.store('cart') with items array backed by localStorage
  - Methods: add(product, size, qty), remove(id), updateQty(id, qty), clear()
  - Getters: total, count
  - Auto-save to localStorage on every change
- `CartDrawer.astro`: Slide-out drawer with cart items, quantities, subtotal, "Checkout" button
- Quick-add buttons on product cards use `$store.cart.add()`

### Step 5: Homepage
- `src/pages/index.astro`: Fetch featured products from D1 at request time
  - Hero section: large title with CSS animations, tagline, "Shop Now" CTA
  - Announcement bar: "Free shipping on prepaid orders" scrolling text (CSS-only)
  - Gallery marquee: 3 brand images in infinite scroll (CSS animation, no JS)
  - Featured products grid: 3 featured ProductCards
  - Brand story excerpt: 2-3 lines + "Read Our Story" link
  - Trust badges: Free shipping, COD available, secure payments

### Step 6: Product Pages
- `src/pages/products/index.astro`: Fetch all products from D1, render in 2-col (mobile) / 3-col (desktop) grid using ProductCard components
- `src/pages/products/[id].astro` (SSR): Fetch single product from D1
  - Large product image
  - Name, price (strikethrough), sale price
  - Size selector (S, M, L, XL, XXL) - Alpine.js for selection state
  - Quantity selector
  - "Add to Bag" button -> `$store.cart.add()`
  - Description, material/fit details
  - JSON-LD Product schema for SEO

### Step 7: Customer Authentication
- `src/lib/auth.ts`: JWT helpers using Web Crypto API (available in Cloudflare Workers)
  - `createToken(payload)`: sign JWT with HMAC-SHA256 using AUTH_SECRET env var
  - `verifyToken(token)`: verify and decode JWT
  - `getSession(request)`: read `intru_session` cookie, verify JWT, return user
- **Google OAuth flow:**
  - `api/auth/google.ts`: Redirect to Google OAuth consent URL
  - `api/auth/google-callback.ts`: Exchange code for token, fetch user profile, upsert user in D1, set JWT cookie
- **Email/password flow:**
  - `api/auth/register.ts`: Hash password (Web Crypto PBKDF2), insert user in D1, set JWT cookie
  - `api/auth/login.ts`: Verify password hash, set JWT cookie
- `LoginModal.astro`: Alpine.js modal with Google button + email/password form tabs
- Env vars needed: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AUTH_SECRET`

### Step 8: Razorpay Checkout
- `src/lib/razorpay.ts`: Direct REST API calls using `fetch()` (no npm SDK - Workers compatible)
  - `createOrder(amount)`: POST to `https://api.razorpay.com/v1/orders` with Basic auth
  - `verifySignature(orderId, paymentId, signature)`: HMAC-SHA256 verification using Web Crypto
- `src/pages/checkout.astro` (SSR, requires auth):
  - Shipping form: name, email, phone, address, city, state, pincode
  - Order summary from Alpine.js cart store
  - "Pay Now" button triggers:
    1. POST to `/api/orders/create` (creates D1 order + Razorpay order)
    2. Opens Razorpay Checkout popup (load `https://checkout.razorpay.com/v1/checkout.js`)
    3. On success: POST to `/api/orders/verify` (verify signature, update D1 order status to 'paid')
    4. Redirect to success page
- `api/orders/create.ts`: Validate cart, create Razorpay order, insert D1 order row
- `api/orders/verify.ts`: Verify Razorpay signature, update order status
- Env vars: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `PUBLIC_RAZORPAY_KEY_ID`

### Step 9: Admin Panel
- **Admin login** (`src/pages/admin/login.astro`):
  - Password field, check against bcrypt/PBKDF2 hash of `intru@27` stored in D1 admin user row
  - On success, set JWT with `role: 'admin'`
  - Future: check if email is in `admin_emails` list
- **Admin middleware** (in `AdminLayout.astro`): verify JWT has `role: 'admin'`, redirect to admin login if not
- **Dashboard** (`admin/index.astro`): Total orders count, total revenue, product count from D1
- **Products** (`admin/products.astro`):
  - Table: name, price, sale_price, category, stock_status, actions (edit/delete)
  - Add/Edit form: name, description, price, sale_price, category, image upload (-> R2), stock_status
  - API: `api/admin/products.ts` handles GET/POST/PUT/DELETE
- **Pages** (`admin/pages.astro`):
  - List of content pages (privacy, terms, returns, shipping)
  - Edit form: title, content (textarea), meta_title, meta_description
  - API: `api/admin/pages.ts` handles GET/PUT
- **Orders** (`admin/orders.astro`):
  - Table: order ID, customer email, total, status, date
  - Update status dropdown (pending -> paid -> shipped -> delivered)

### Step 10: Content Pages
- `src/pages/about.astro`: Brand story page with:
  - Hero image + "Our Story" heading
  - Founding story, philosophy, core values (Design First, Quality, Customer Centric)
  - SEO: JSON-LD Organization schema, targeted meta description
  - Internal links to products
- `src/pages/legal/privacy.astro`: Fetch content from D1 `pages` table where slug='privacy'
- `src/pages/legal/terms.astro`: Fetch from D1 where slug='terms'
- `src/pages/legal/returns.astro`: Fetch from D1 where slug='returns'
- `src/pages/legal/shipping.astro`: Fetch from D1 where slug='shipping'
- All legal pages: BaseLayout with breadcrumbs, simple typography, proper meta tags

### Step 11: SEO & Performance
- `robots.txt`: Allow all, include sitemap URL
- Sitemap: Auto-generated by `@astrojs/sitemap` integration (configured in astro.config.mjs)
- JSON-LD on every product page: Product schema with name, price, availability, brand, image
- JSON-LD on homepage: Organization + WebSite schema
- Meta tags: unique title/description per page, OG image, canonical URL
- Image optimization: Astro `<Image>` component with lazy loading, explicit width/height (no CLS)
- Target: Lighthouse 95+ on mobile

### Step 12: Deployment
- Create Cloudflare R2 bucket: `npx wrangler r2 bucket create intru-images`
- Upload product images to R2 (from existing CDN URLs)
- Set secrets: `npx wrangler secret put RAZORPAY_KEY_SECRET` (and others)
- Connect GitHub repo to Cloudflare Pages dashboard
- Build command: `npm run build`, output: `dist/`
- Add custom domain `intru.in` in Cloudflare Pages
- DNS: point to Cloudflare (likely already done since intru.in is active)
- Test full flow: browse -> add to cart -> checkout -> Razorpay test payment -> admin view order

---

## Database Schema Changes

Add to existing `schema.sql`:
```sql
-- Add sale_price to products
ALTER TABLE products ADD COLUMN sale_price REAL;

-- Add password_hash to users for email/password auth
ALTER TABLE users ADD COLUMN password_hash TEXT;
```

Seed data (`seed.sql`): Insert the 6 products and 4 legal page entries from existing codebase content.

---

## Key Data Flows

**Customer buys a product:**
1. Browse `/products` -> click product -> `/products/[id]`
2. Select size, click "Add to Bag" -> Alpine.js adds to localStorage cart
3. Click cart icon -> CartDrawer shows items
4. Click "Checkout" -> `/checkout` (must be logged in, redirect to login if not)
5. Fill shipping form, click "Pay Now"
6. Frontend POST `/api/orders/create` -> server creates D1 order + Razorpay order
7. Razorpay popup opens -> customer pays
8. Razorpay callback -> frontend POST `/api/orders/verify` -> server verifies signature, marks order paid
9. Redirect to success page, cart cleared

**Admin manages products:**
1. Go to `/admin/login` -> enter password `intru@27`
2. JWT set with `role: 'admin'`
3. Dashboard shows stats from D1
4. `/admin/products` -> edit product -> form submits to `/api/admin/products`
5. Image upload -> `/api/admin/upload` -> stored in R2 -> URL saved in D1

---

## Environment Variables (.env)

```
AUTH_SECRET=<random-secret-for-jwt>
GOOGLE_CLIENT_ID=<from-google-console>
GOOGLE_CLIENT_SECRET=<from-google-console>
RAZORPAY_KEY_ID=<from-razorpay-dashboard>
RAZORPAY_KEY_SECRET=<from-razorpay-dashboard>
PUBLIC_RAZORPAY_KEY_ID=<same-as-RAZORPAY_KEY_ID-but-public>
SITE_URL=https://intru.in
```

---

## Verification Plan

1. **Dev server**: `npm run dev` -> verify all pages render, navigation works
2. **Cart**: Add/remove products, refresh page (localStorage persists), verify count badge
3. **Auth**: Test Google OAuth flow, test email/password signup/login
4. **Checkout**: Use Razorpay test mode keys, complete a test payment, verify order in D1
5. **Admin**: Login with `intru@27`, add/edit/delete a product, edit a legal page, view orders
6. **SEO**: Run Lighthouse audit, verify JSON-LD with Google Rich Results Test, check sitemap.xml
7. **Mobile**: Test responsive layout on 375px, 768px, 1024px widths
8. **Deploy**: `npx wrangler pages deploy dist/` or push to GitHub for auto-deploy, verify production
