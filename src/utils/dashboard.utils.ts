"use server";

import { validateSession } from "@/libs/auth.libs";

export const getUserAnalytics = async () => {
  try {
    const token = await validateSession();
    await fetch(process.env.SERVER_BASE_URL! + `/projects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: [`analytics_of_user_page`],
      },
    });
  } catch {
    return [];
  }
};
