interface Users {
  id: number;
  username: string;
  password: string;
  theme: string;
  fontSize: string;
}

export default async function getUsers() {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users " + response.status);
    }
    const data: Users[] = await response.json();
    return data;
  } catch (err: unknown) {
    console.error("Database error: ", (err as Error).message);
  }
}
