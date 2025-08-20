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

export async function updateUserApi(
  id: number,
  updates: { theme?: string; fontSize?: string }
) {
  try {
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...updates }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.status}`);
    }
    const result = await response.json();
    return {
      success: true,
      message: result.message,
      updatedUser: result.updatedUser,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: `Error updating user: ${(err as Error).message}`,
    };
  }
}
