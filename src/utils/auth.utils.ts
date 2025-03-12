"use server";

import { getToken, setRefreshAndAccessToken } from "@/libs/auth.libs";
// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { ApiStatus } from "@/types/globals.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(
  prevState: { message: string; status: ApiStatus },
  formData: FormData
): Promise<{ message: string; status: ApiStatus }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await fetch(process.env.SERVER_BASE_URL! + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  console.log(data);

  if (data?.acknowledgement === false) {
    return { message: data?.message, status: ApiStatus.ERROR };
  }

  const { accessToken, refreshToken } = data;

  setRefreshAndAccessToken(accessToken, refreshToken);

  // Redirect on success
  redirect("/");
  // return { message: "Login Successfull", status: ApiStatus.FINISH };
}
