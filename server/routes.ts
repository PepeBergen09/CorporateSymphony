import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { db } from "@db";
import { posts, events, newsletters } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Blog routes
  app.get("/api/posts", async (req, res) => {
    const allPosts = await db.query.posts.findMany({
      with: { author: true },
      orderBy: desc(posts.createdAt),
    });
    res.json(allPosts);
  });

  app.post("/api/posts", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(403).send("Unauthorized");
    }

    const post = await db.insert(posts).values({
      ...req.body,
      authorId: req.user.id,
    }).returning();
    res.json(post[0]);
  });

  // Events routes
  app.get("/api/events", async (req, res) => {
    const allEvents = await db.query.events.findMany({
      orderBy: desc(events.date),
    });
    res.json(allEvents);
  });

  app.post("/api/events", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(403).send("Unauthorized");
    }

    const event = await db.insert(events).values(req.body).returning();
    res.json(event[0]);
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const subscription = await db.insert(newsletters)
        .values({ email: req.body.email })
        .returning();
      res.json(subscription[0]);
    } catch (error) {
      res.status(400).send("Email already subscribed");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
