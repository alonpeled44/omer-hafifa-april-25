import { FontSize, Theme, User } from "./Types";

export default async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users " + response.status);
    }
    const jsonResponse = await response.json();
    const data: User[] = jsonResponse.data;

    return data;
  } catch (err: unknown) {
    console.error("Database error: ", (err as Error).message);
    return [];
  }
}

export async function updateUserApi(
  id: number,
  updates: { theme?: Theme; fontSize?: FontSize }
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
      message: `Error updating user: ${err instanceof Error && err.message}`,
    };
  }
}
