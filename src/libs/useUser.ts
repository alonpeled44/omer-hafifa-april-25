interface Users {
  id: number;
  username: string;
  password: string;
  theme: string;
  fontSize: string;
}

export default async function getUsers(): Promise<Users[]> {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users " + response.status);
    }
    const jsonResponse = await response.json();
    const data: Users[] = jsonResponse.data;
    console.log(data);
    return data;
  } catch (err: unknown) {
    console.error("Database error: ", (err as Error).message);
    return [];
  }
}
