import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { User } from "./models/User";
import { Group } from "./models/Group";
import { Expense } from "./models/Expense";

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // --- Auth Routes ---
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { username, password, name, email } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await User.create({ username, password, name, email });
      req.session.userId = user.id;
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error registering user" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error logging in" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Error logging out" });
      res.sendStatus(200);
    });
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    if (!req.session.userId) {
      return res.sendStatus(401);
    }
    const user = await User.findById(req.session.userId);
    if (!user) return res.sendStatus(401);
    res.json(user);
  });

  // --- Group Routes ---
  app.get("/api/groups", async (req: Request, res: Response) => {
    if (!req.session.userId) return res.sendStatus(401);
    try {
      // Find groups where user is a member or created it (simplified logic)
      const groups = await Group.find({ members: req.session.userId }).populate('members');
      res.json(groups);
    } catch (error) {
      res.status(500).json({ message: "Error fetching groups" });
    }
  });

  app.post("/api/groups", async (req: Request, res: Response) => {
    if (!req.session.userId) return res.sendStatus(401);
    try {
      const { name, type, members } = req.body;
      // Ensure creator is in members
      const memberIds = [...new Set([...(members || []), req.session.userId])];

      const group = await Group.create({
        name,
        type,
        currency: '$',
        createdBy: req.session.userId,
        members: memberIds
      });

      const populatedGroup = await Group.findById(group._id).populate('members');
      res.status(201).json(populatedGroup);
    } catch (error) {
      res.status(500).json({ message: "Error creating group" });
    }
  });

  app.get("/api/groups/:id", async (req: Request, res: Response) => {
    if (!req.session.userId) return res.sendStatus(401);
    try {
      const group = await Group.findById(req.params.id).populate('members');
      if (!group) return res.status(404).json({ message: "Group not found" });
      res.json(group);
    } catch (error) {
      res.status(500).json({ message: "Error fetching group" });
    }
  });

  // --- Expense Routes ---
  app.post("/api/expenses", async (req: Request, res: Response) => {
    if (!req.session.userId) return res.sendStatus(401);
    try {
      const expense = await Expense.create({
        ...req.body,
        paidBy: req.session.userId, // Default to logged in user if not specified, or validate
      });
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ message: "Error creating expense" });
    }
  });

  app.get("/api/expenses", async (req: Request, res: Response) => {
    if (!req.session.userId) return res.sendStatus(401);
    try {
      // Fetch all expenses for all groups the user is part of is logical,
      // but typically we fetch by group or just all expenses involved.
      // For simplicity let's fetch all expenses where user is a participant or payer.
      const expenses = await Expense.find({
        $or: [
          { paidBy: req.session.userId },
          { participants: req.session.userId }
        ]
      });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching expenses" });
    }
  });

  return httpServer;
}
