module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/lib/product-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productService",
    ()=>productService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/nanoid/index.js [app-route] (ecmascript) <locals>");
;
// Initial Mock Data
let products = [
    {
        id: "1",
        name: "Doodles T-Shirt",
        description: "Inspired by all the little doodles that bring warmth and joy. Fit: Oversized. Material: Premium French Terry (240 GSM). Color: White.",
        price: 1499,
        sale_price: 999,
        category: "T-Shirts",
        image_url: "https://intru.in/cdn/shop/files/3.png?v=1748692106&width=1946",
        stock_status: "in_stock",
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "2",
        name: "No Risk Porsche",
        description: "Designed for comfort and confidence, this statement piece merges effortless style with a bold edge. Fit: Oversized. Material: Premium French Terry (240 GSM).",
        price: 1499,
        sale_price: 999,
        category: "T-Shirts",
        image_url: "https://intru.in/cdn/shop/files/F51687B9-2BF2-43E0-988A-30272833B19E.jpg?v=1756359581&width=1920",
        stock_status: "in_stock",
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "3",
        name: "Orange Puff Printed T-Shirt",
        description: "Made for the coffee-obsessed. Featuring a bold puff print on premium fabric, this tee serves up comfort and caffeine-core energy.",
        price: 1499,
        sale_price: 899,
        category: "T-Shirts",
        image_url: "https://intru.in/cdn/shop/files/1_3de916a1-a217-41ee-9b2e-9e2c3130c4d6.png?v=1748190442&width=1445",
        stock_status: "in_stock",
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "4",
        name: "Romanticise Crop Tee",
        description: "Made to romanticise the little things — this cropped tee brings soft structure and breezy ease to your everyday. Material: Spandex.",
        price: 999,
        sale_price: 699,
        category: "T-Shirts",
        image_url: "https://intru.in/cdn/shop/files/4_f2aa413e-6e91-49bd-8f16-2efd41b4d6ea.png?v=1748190572&width=1946",
        stock_status: "in_stock",
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "5",
        name: "Stripe 18 Shirt",
        description: "Clean lines, cool tones. This loose-fit striped shirt brings relaxed structure to your look.",
        price: 1699,
        sale_price: 1099,
        category: "Shirts",
        image_url: "https://intru.in/cdn/shop/files/99.png?v=1748173436&width=1946",
        stock_status: "in_stock",
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "6",
        name: "Summer Shirt",
        description: "Light, airy, and made to move with you. Your sunshine staple bringing easygoing energy and warm-weather charm. Color: Butter Yellow.",
        price: 1599,
        sale_price: 999,
        category: "Shirts",
        image_url: "https://intru.in/cdn/shop/files/03.png?v=1756359941&width=1946",
        stock_status: "in_stock",
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];
const productService = {
    async getAll () {
        // Simulate API delay
        await new Promise((resolve)=>setTimeout(resolve, 500));
        return [
            ...products
        ];
    },
    async getById (id) {
        await new Promise((resolve)=>setTimeout(resolve, 200));
        return products.find((p)=>p.id === id);
    },
    async create (data) {
        const newProduct = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(),
            ...data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        products.push(newProduct);
        return newProduct;
    },
    async update (id, data) {
        const index = products.findIndex((p)=>p.id === id);
        if (index === -1) return null;
        products[index] = {
            ...products[index],
            ...data,
            updated_at: new Date().toISOString()
        };
        return products[index];
    },
    async delete (id) {
        const initialLength = products.length;
        products = products.filter((p)=>p.id !== id);
        return products.length !== initialLength;
    }
};
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logActivity",
    ()=>logActivity,
    "logError",
    ()=>logError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/nanoid/index.js [app-route] (ecmascript) <locals>");
;
async function logActivity({ user_id, action, entity_type, entity_id, metadata, level = "info" }) {
    const timestamp = new Date().toISOString();
    // In a real edge environment, we would access D1 via bindings context or an API route
    // For now, in App Router server components/actions, we log to stdout which is captured by deployment logs
    const logData = {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(),
        timestamp,
        level,
        user_id,
        action,
        entity_type,
        entity_id,
        metadata
    };
    // Structured logging for better parsing
    console.log(JSON.stringify(logData));
// TODO: Insert into D1 'activity_logs' table
// This requires setting up the D1 client connection which depends on the specific runtime context (edge vs node)
// For Cloudflare Pages + Next.js, it's best to use a separate API route or server action that has the binding
}
async function logError(error, context) {
    console.error(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: "error",
        message: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        context
    }));
}
}),
"[project]/lib/audit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logAudit",
    ()=>logAudit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logger.ts [app-route] (ecmascript)");
;
async function logAudit({ admin_id, action, resource_type, resource_id, old_value, new_value }) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logActivity"])({
        user_id: admin_id,
        action: `ADMIN_${action}`,
        entity_type: resource_type,
        entity_id: resource_id,
        metadata: {
            audit: true,
            changes: {
                from: old_value,
                to: new_value
            }
        },
        level: "warning"
    });
// TODO: Insert into specific 'audit_logs' table in D1
}
}),
"[project]/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$product$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/product-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/jwt.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/@auth/core/jwt.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/audit.ts [app-route] (ecmascript)");
;
;
;
;
async function GET() {
    const products = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$product$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productService"].getAll();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(products);
}
async function POST(req) {
    // Auth check
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getToken"])({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });
    if (!token || token.role !== "admin") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    try {
        const body = await req.json();
        const newProduct = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$product$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productService"].create(body);
        // Audit Log
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logAudit"])({
            admin_id: token.sub || "unknown",
            action: "CREATE_PRODUCT",
            resource_type: "product",
            resource_id: newProduct.id,
            new_value: newProduct
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newProduct, {
            status: 201
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create product"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2f7774ff._.js.map