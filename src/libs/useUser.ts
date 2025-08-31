import { FontSize, Theme, User } from "./types";
import { getErrorMessage } from "./errors";

export default async function getUsers() {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users " + response.status);
    }

    const { data }: { data: User[] } = await response.json();
    return data;
  } catch (err: unknown) {
    console.error("Database error: ", getErrorMessage(err));
    return [];
  }
}

export async function updateUserSettings(
  id: number,
  updates: { theme?: Theme; fontSize?: FontSize }
) {
  try {
    const response = await fetch(`/api/users?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...updates }),
    });

    if (!response.ok)
      throw new Error(`Failed to update user: ${response.status}`);

    const result = await response.json();

    return {
      success: true,
      message: result.message,
      updatedUser: result.updatedUser,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: "Error updating user: " + getErrorMessage(err),
    };
  }
}
