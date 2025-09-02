import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { getErrorMessage } from "@/libs/errors";

async function connectToDb(): Promise<Database> {
  const db = await open({
    filename: path.join(process.cwd(), "db.db"),
    driver: sqlite3.Database,
  });
  return db;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await connectToDb();
    if (req.method === "GET") {
      const rows = await db.all("SELECT * FROM users");
      res.status(200).json({ data: rows });
    } else if (req.method === "PUT") {
      const { id } = req.query;
      const { theme, fontSize } = req.body;

      // Validate input
      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }
      if (!theme && !fontSize) {
        return res.status(400).json({
          error: "At least one field (theme or fontSize) must be provided",
        });
      }

      // Build dynamic update query
      const updates: string[] = [];
      const values: (string | number)[] = [];
      if (theme) {
        updates.push("theme = ?");
        values.push(theme);
      }
      if (fontSize) {
        updates.push("fontSize = ?");
        values.push(fontSize);
      }

      const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
      const result = await db.run(query, [...values, id]);

      if (result.changes === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      // Fetch the updated user
      const updatedUser = await db.get("SELECT * FROM users WHERE id = ?", [
        id,
      ]);

      res.status(200).json({
        message: "User updated successfully",
        updatedUser,
      });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    res.status(500).json({ error: "Database error: " + getErrorMessage(err) });
  }
}
