"use server";

import { validateSession } from "@/libs/auth.libs";
import { ApisByUserResponse } from "@/types/apis.types";

export const getApisByUser = async (
  page: number = 1,
  limit: number = 10
): Promise<ApisByUserResponse> => {
  try {
    const token = await validateSession();

    const response = await fetch(
      process.env.SERVER_BASE_URL! + `/apis?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: [`apis_by_user_page_${page}`],
        },
      }
    );

    const responseData = await response.json();
    
    if (responseData?.acknowledgement) {
      return responseData?.data;
    }

    return {} as ApisByUserResponse;
  } catch {
    return {} as ApisByUserResponse;
  }
};
