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
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Database error: " + (err as Error).message });
  }
}
