"use server";

import { validateSession } from "@/libs/auth.libs";
import { Token } from "@/types/tokens.types";

export const getUserToken = async (): Promise<Token[]> => {
  try {
    const token = await validateSession();

    const response = await fetch(process.env.SERVER_BASE_URL! + `/tokens`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: [`tokens_by_user_page`],
      },
    });

    const responseData = await response.json();

    console.log(responseData)

    if (responseData?.acknowledgement) {
      return responseData?.data;
    }

    return [];
  } catch {
    return [];
  }
};
