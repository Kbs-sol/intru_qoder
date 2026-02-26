(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f12a3914._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/lib/logger.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logActivity",
    ()=>logActivity,
    "logError",
    ()=>logError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/nanoid/index.browser.js [middleware-edge] (ecmascript) <locals>");
;
async function logActivity({ user_id, action, entity_type, entity_id, metadata, level = "info" }) {
    const timestamp = new Date().toISOString();
    // In a real edge environment, we would access D1 via bindings context or an API route
    // For now, in App Router server components/actions, we log to stdout which is captured by deployment logs
    const logData = {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(),
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
"[project]/lib/security.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkRateLimit",
    ()=>checkRateLimit,
    "logSecurityEvent",
    ()=>logSecurityEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logger.ts [middleware-edge] (ecmascript)");
;
async function logSecurityEvent({ event_type, user_id, ip_address, severity, details }) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["logActivity"])({
        user_id,
        action: `SECURITY_${event_type}`,
        entity_type: "security_event",
        metadata: {
            ip_address,
            severity,
            details
        },
        level: severity === "low" ? "info" : "error"
    });
    // TODO: If severity is high/critical, trigger alerts (e.g., email to admin)
    if (severity === "critical") {
        console.error(`CRITICAL SECURITY EVENT: ${event_type} from IP ${ip_address}`);
    }
}
/**
 * Simple in-memory rate limiter for demo purposes
 * In production, use Cloudflare KV or Rate Limiting API
 */ const rateLimitMap = new Map();
function checkRateLimit(ip, limit = 100, windowMs = 60000) {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (!record) {
        rateLimitMap.set(ip, {
            count: 1,
            timestamp: now
        });
        return true;
    }
    if (now - record.timestamp > windowMs) {
        // Reset window
        rateLimitMap.set(ip, {
            count: 1,
            timestamp: now
        });
        return true;
    }
    if (record.count >= limit) {
        return false; // Rate limit exceeded
    }
    record.count++;
    return true;
}
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/jwt.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/node_modules/@auth/core/jwt.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/security.ts [middleware-edge] (ecmascript)");
;
;
;
// Removed: export { auth as middleware } from "@/lib/auth" 
// We are implementing a custom middleware function instead. 
// If we needed auth logic, we'd use `auth` wrapper, but here we do manual token check for admin.
// Define paths that require authentication/admin privileges
const adminPaths = [
    "/admin"
];
const protectedPaths = [
    "/checkout",
    "/profile"
];
async function middleware(request) {
    const { pathname } = request.nextUrl;
    // Fix: Access ip safely or providing fallback. NextRequest interface does extend Request which has no standard .ip, but Next.js adds it.
    // Casting to any to avoid TS error if types are not up to date, or checking headers.
    const ip = request.ip || request.headers.get("x-forwarded-for") || "127.0.0.1";
    // 1. Security Headers
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    // 2. Rate Limiting (Simple check)
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["checkRateLimit"])(ip, 100, 60000)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["logSecurityEvent"])({
            event_type: "BLOCKED_IP",
            ip_address: ip,
            severity: "medium",
            details: {
                reason: "rate_limit_exceeded",
                path: pathname
            }
        });
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"]("Too Many Requests", {
            status: 429
        });
    }
    // 3. Admin Route Protection
    if (adminPaths.some((path)=>pathname.startsWith(path))) {
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getToken"])({
            req: request,
            secret: process.env.NEXTAUTH_SECRET
        });
        if (!token) {
            // Redirect to login if not authenticated
            const url = new URL("/", request.url);
            url.searchParams.set("error", "unauthorized");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
        }
        if (token.role !== "admin") {
            // Log unauthorized admin access attempt
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["logSecurityEvent"])({
                event_type: "ADMIN_ACCESS",
                user_id: token.sub,
                ip_address: ip,
                severity: "high",
                details: {
                    status: "unauthorized_role",
                    path: pathname
                }
            });
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"]("Unauthorized", {
                status: 403
            });
        }
    }
    return response;
}
const config = {
    matcher: [
        // Apply to all routes except static files
        "/((?!_next/static|_next/image|favicon.ico|images/).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f12a3914._.js.map