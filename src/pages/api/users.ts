import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

async function getDb(): Promise<Database> {
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
    const db = await getDb();
    if (req.method === "GET") {
      const rows = await db.all("SELECT * FROM users");
      res.status(200).json({ data: [...rows] });
    } else if (req.method === "PUT") {
      const { id, theme, fontSize } = req.body;

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

      // Add id to values for WHERE clause
      values.push(id);

      const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
      const result = await db.run(query, values);

      if (result.changes === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Database error: " + (err as Error).message });
  }
}
