-- Seed Products
INSERT OR REPLACE INTO products (id, name, description, price, sale_price, image_url, category, stock_status, featured, created_at, updated_at) VALUES
('prod_001', 'Doodles T-Shirt', 'Inspired by all the little doodles that bring warmth and joy. Fit: Oversized. Material: Premium French Terry (240 GSM). Color: White.', 1499, 999, 'https://intru.in/cdn/shop/files/3.png?v=1748692106&width=1946', 'T-Shirts', 'in_stock', 1, datetime('now'), datetime('now')),
('prod_002', 'No Risk Porsche', 'Designed for comfort and confidence, this statement piece merges effortless style with a bold edge. Fit: Oversized. Material: Premium French Terry (240 GSM).', 1499, 999, 'https://intru.in/cdn/shop/files/F51687B9-2BF2-43E0-988A-30272833B19E.jpg?v=1756359581&width=1920', 'T-Shirts', 'in_stock', 1, datetime('now'), datetime('now')),
('prod_003', 'Orange Puff Printed T-Shirt', 'Made for the coffee-obsessed. Featuring a bold puff print on premium fabric, this tee serves up comfort and caffeine-core energy.', 1499, 899, 'https://intru.in/cdn/shop/files/1_3de916a1-a217-41ee-9b2e-9e2c3130c4d6.png?v=1748190442&width=1445', 'T-Shirts', 'in_stock', 1, datetime('now'), datetime('now')),
('prod_004', 'Romanticise Crop Tee', 'Made to romanticise the little things — this cropped tee brings soft structure and breezy ease to your everyday. Material: Spandex.', 999, 699, 'https://intru.in/cdn/shop/files/4_f2aa413e-6e91-49bd-8f16-2efd41b4d6ea.png?v=1748190572&width=1946', 'T-Shirts', 'in_stock', 0, datetime('now'), datetime('now')),
('prod_005', 'Stripe 18 Shirt', 'Clean lines, cool tones. This loose-fit striped shirt brings relaxed structure to your look.', 1699, 1099, 'https://intru.in/cdn/shop/files/99.png?v=1748173436&width=1946', 'Shirts', 'in_stock', 0, datetime('now'), datetime('now')),
('prod_006', 'Summer Shirt', 'Light, airy, and made to move with you. Your sunshine staple bringing easygoing energy and warm-weather charm. Color: Butter Yellow.', 1599, 999, 'https://intru.in/cdn/shop/files/03.png?v=1756359941&width=1946', 'Shirts', 'in_stock', 0, datetime('now'), datetime('now'));

-- Seed Admin User (password: intru@27, hash generated via PBKDF2)
-- The actual hash will be generated at runtime on first admin login setup
INSERT OR REPLACE INTO users (id, email, name, provider, role, created_at) VALUES
('admin_001', 'admin@intru.in', 'Admin', 'credentials', 'admin', datetime('now'));

-- Seed Content Pages
INSERT OR REPLACE INTO pages (id, slug, title, content, meta_title, meta_description, updated_at) VALUES
('page_001', 'privacy', 'Privacy Policy', '<h2>1. Information We Collect</h2>
<p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>

<h2>2. How Do We Use Your Personal Information?</h2>
<p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</p>

<h2>3. Sharing Your Personal Information</h2>
<p>We share your Personal Information with third parties to help us use your Personal Information, as described above. We use secure payment processors and shipping partners to fulfill orders.</p>

<h2>4. Data Retention</h2>
<p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.</p>

<h2>5. Contact Us</h2>
<p>For more information about our privacy practices, please contact us at <a href="mailto:shop@intru.in">shop@intru.in</a>.</p>', 'Privacy Policy | intru', 'Learn how intru.in collects, uses, and protects your personal information.', datetime('now')),

('page_002', 'terms', 'Terms & Conditions', '<h2>1. Overview</h2>
<p>This website is operated by intru. Throughout the site, the terms "we", "us" and "our" refer to intru. intru offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>

<h2>2. Online Store Terms</h2>
<p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence.</p>

<h2>3. Accuracy, Completeness and Timeliness of Information</h2>
<p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only.</p>

<h2>4. Products or Services</h2>
<p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to exchange only according to our Exchange Policy.</p>

<h2>5. Contact</h2>
<p>Questions about the Terms of Service should be sent to us at <a href="mailto:shop@intru.in">shop@intru.in</a>.</p>', 'Terms & Conditions | intru', 'Read the terms and conditions for using intru.in online store.', datetime('now')),

('page_003', 'returns', 'Returns & Exchanges', '<h2>Exchange Policy</h2>
<p>We only offer exchanges for items that are <strong>damaged, defective, or incorrect</strong>. We do not offer refunds.</p>

<h2>Eligibility</h2>
<p>To be eligible for an exchange, your item must be <strong>unworn and unwashed</strong>. You must contact us within <strong>36 hours</strong> of delivery.</p>

<h2>How to Initiate</h2>
<p>Please contact us at <a href="mailto:shop@intru.in">shop@intru.in</a> with your order details and photos of the issue.</p>

<h2>Process</h2>
<p>Once we receive and inspect your item, we will send you a replacement. If the same item is not available, we will offer a store credit.</p>', 'Returns & Exchanges | intru', 'Learn about our exchange-only policy. Contact us within 36 hours of delivery for damaged or defective items.', datetime('now')),

('page_004', 'shipping', 'Shipping Policy', '<h2>Processing Time</h2>
<p>Orders are generally processed and shipped within <strong>1-2 working days</strong>.</p>

<h2>Delivery Time</h2>
<p>Once dispatched, delivery typically takes <strong>3-5 business days</strong>, depending on your location.</p>

<h2>Tracking</h2>
<p>You will receive a tracking link via email as soon as your order ships.</p>

<h2>Shipping Costs</h2>
<p>We offer <strong>Free Shipping</strong> on all prepaid orders across India. Cash on Delivery (COD) is also available.</p>

<h2>Contact</h2>
<p>For shipping-related queries, reach out to us at <a href="mailto:shop@intru.in">shop@intru.in</a>.</p>', 'Shipping Policy | intru', 'Free shipping on all prepaid orders across India. COD available. Delivery in 3-5 business days.', datetime('now'));
