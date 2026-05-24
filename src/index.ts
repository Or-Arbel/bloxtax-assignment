import { serve } from "bun";
import { count, desc } from "drizzle-orm";
import index from "./index.html";
import { db } from "./api/database";
import { transactions } from "./api/database/schema";

const server = serve({
  port: 3000,
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    "/api/data": async (req) => {
      const { searchParams } = new URL(req.url);
      const parsedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
      const parsedLimit = Number.parseInt(searchParams.get("limit") ?? "20", 10);
      const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
      const limit =
        Number.isNaN(parsedLimit) || parsedLimit < 1
          ? 20
          : Math.min(parsedLimit, 100);
      const offset = (page - 1) * limit;

      const [totalResult, trxs] = await Promise.all([
        db.select({ value: count() }).from(transactions),
        db.select().from(transactions).orderBy(desc(transactions.date)).limit(limit).offset(offset),
      ]);
      const total = totalResult[0]?.value ?? 0;
      const totalPages = Math.max(1, Math.ceil(total / limit));
      const safePage = Math.min(page, totalPages);
      const safeOffset = (safePage - 1) * limit;

      const paginatedRows =
        safePage === page
          ? trxs
          : await db.select().from(transactions).orderBy(desc(transactions.date)).limit(limit).offset(safeOffset);

      return Response.json({
        data: paginatedRows,
        pagination: {
          page: safePage,
          limit,
          total,
          totalPages,
          hasNextPage: safePage < totalPages,
          hasPreviousPage: safePage > 1,
        },
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
