export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price: number | null;
  image_url: string;
  category: string;
  stock_status: string;
  featured: number;
  created_at: string;
  updated_at: string;
}

export interface PageContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  products: string;
  total_amount: number;
  status: string;
  razorpay_order_id: string | null;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  shipping_address: string | null;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  provider: string | null;
  role: string;
  password_hash: string | null;
  created_at: string;
}

type D1Database = {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<unknown>;
};

type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<{ results: T[] }>;
  first<T = unknown>(): Promise<T | null>;
  run(): Promise<unknown>;
};

// Products
export async function getProducts(db: D1Database): Promise<Product[]> {
  const { results } = await db
    .prepare('SELECT * FROM products WHERE stock_status = ? ORDER BY created_at DESC')
    .bind('in_stock')
    .all<Product>();
  return results;
}

export async function getFeaturedProducts(db: D1Database): Promise<Product[]> {
  const { results } = await db
    .prepare('SELECT * FROM products WHERE featured = 1 AND stock_status = ? ORDER BY created_at DESC')
    .bind('in_stock')
    .all<Product>();
  return results;
}

export async function getProductById(db: D1Database, id: string): Promise<Product | null> {
  return db.prepare('SELECT * FROM products WHERE id = ?').bind(id).first<Product>();
}

export async function getProductsByCategory(db: D1Database, category: string): Promise<Product[]> {
  const { results } = await db
    .prepare('SELECT * FROM products WHERE category = ? AND stock_status = ? ORDER BY created_at DESC')
    .bind(category, 'in_stock')
    .all<Product>();
  return results;
}

export async function getAllProducts(db: D1Database): Promise<Product[]> {
  const { results } = await db
    .prepare('SELECT * FROM products ORDER BY created_at DESC')
    .all<Product>();
  return results;
}

export async function createProduct(db: D1Database, product: Omit<Product, 'created_at' | 'updated_at'>): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      'INSERT INTO products (id, name, description, price, sale_price, image_url, category, stock_status, featured, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .bind(product.id, product.name, product.description, product.price, product.sale_price, product.image_url, product.category, product.stock_status, product.featured, now, now)
    .run();
}

export async function updateProduct(db: D1Database, id: string, data: Partial<Product>): Promise<void> {
  const fields: string[] = [];
  const values: unknown[] = [];
  const allowedFields = ['name', 'description', 'price', 'sale_price', 'image_url', 'category', 'stock_status', 'featured'];

  for (const key of allowedFields) {
    if (key in data) {
      fields.push(`${key} = ?`);
      values.push((data as Record<string, unknown>)[key]);
    }
  }

  if (fields.length === 0) return;

  fields.push('updated_at = ?');
  values.push(new Date().toISOString());
  values.push(id);

  await db.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();
}

export async function deleteProduct(db: D1Database, id: string): Promise<void> {
  await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
}

// Pages
export async function getPageBySlug(db: D1Database, slug: string): Promise<PageContent | null> {
  return db.prepare('SELECT * FROM pages WHERE slug = ?').bind(slug).first<PageContent>();
}

export async function getAllPages(db: D1Database): Promise<PageContent[]> {
  const { results } = await db.prepare('SELECT * FROM pages ORDER BY slug').all<PageContent>();
  return results;
}

export async function updatePage(db: D1Database, slug: string, data: { title?: string; content?: string; meta_title?: string; meta_description?: string }): Promise<void> {
  const fields: string[] = [];
  const values: unknown[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }

  if (fields.length === 0) return;

  fields.push('updated_at = ?');
  values.push(new Date().toISOString());
  values.push(slug);

  await db.prepare(`UPDATE pages SET ${fields.join(', ')} WHERE slug = ?`).bind(...values).run();
}

// Orders
export async function createOrder(db: D1Database, order: Omit<Order, 'created_at'>): Promise<void> {
  await db
    .prepare(
      'INSERT INTO orders (id, user_id, products, total_amount, status, razorpay_order_id, customer_name, customer_email, customer_phone, shipping_address, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .bind(order.id, order.user_id, order.products, order.total_amount, order.status, order.razorpay_order_id, order.customer_name, order.customer_email, order.customer_phone, order.shipping_address, new Date().toISOString())
    .run();
}

export async function updateOrderStatus(db: D1Database, id: string, status: string): Promise<void> {
  await db.prepare('UPDATE orders SET status = ? WHERE id = ?').bind(status, id).run();
}

export async function updateOrderRazorpayId(db: D1Database, id: string, razorpayOrderId: string): Promise<void> {
  await db.prepare('UPDATE orders SET razorpay_order_id = ? WHERE id = ?').bind(razorpayOrderId, id).run();
}

export async function getOrderById(db: D1Database, id: string): Promise<Order | null> {
  return db.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first<Order>();
}

export async function getOrderByRazorpayId(db: D1Database, razorpayOrderId: string): Promise<Order | null> {
  return db.prepare('SELECT * FROM orders WHERE razorpay_order_id = ?').bind(razorpayOrderId).first<Order>();
}

export async function getAllOrders(db: D1Database): Promise<Order[]> {
  const { results } = await db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all<Order>();
  return results;
}

export async function getOrderStats(db: D1Database): Promise<{ total_orders: number; total_revenue: number; paid_orders: number }> {
  const total = await db.prepare('SELECT COUNT(*) as count FROM orders').first<{ count: number }>();
  const revenue = await db.prepare("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status = 'paid'").first<{ total: number }>();
  const paid = await db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'paid'").first<{ count: number }>();
  return {
    total_orders: total?.count ?? 0,
    total_revenue: revenue?.total ?? 0,
    paid_orders: paid?.count ?? 0,
  };
}

// Users
export async function getUserByEmail(db: D1Database, email: string): Promise<User | null> {
  return db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first<User>();
}

export async function getUserById(db: D1Database, id: string): Promise<User | null> {
  return db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first<User>();
}

export async function upsertUser(db: D1Database, user: { id: string; email: string; name: string | null; image: string | null; provider: string; role?: string }): Promise<void> {
  const existing = await getUserByEmail(db, user.email);
  if (existing) {
    await db
      .prepare('UPDATE users SET name = ?, image = ? WHERE email = ?')
      .bind(user.name, user.image, user.email)
      .run();
  } else {
    await db
      .prepare('INSERT INTO users (id, email, name, image, provider, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .bind(user.id, user.email, user.name, user.image, user.provider, user.role ?? 'customer', new Date().toISOString())
      .run();
  }
}
