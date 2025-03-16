"use server";

import { validateSession } from "@/libs/auth.libs";
import { TablesByUserResponse } from "@/types/tables.types";

export const getTablesByUser = async (
  page = 1,
  limit = 10
): Promise<TablesByUserResponse> => {
  const token = await validateSession();

  const response = await fetch(
    process.env.SERVER_BASE_URL! + `/tables/user?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: [`tables_by_user_page_${page}`],
      },
    }
  );

  const responseData = await response.json();
  

  if (!responseData.acknowledgement) {
    return {} as TablesByUserResponse;
  }


  return responseData?.data;
};
