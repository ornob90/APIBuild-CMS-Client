"use server";

import { setRefreshAndAccessToken } from "@/libs/auth.libs";
// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { ApiStatus, ServerActionState } from "@/types/globals.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(
  prevState: ServerActionState,
  formData: FormData
): Promise<ServerActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await fetch(process.env.SERVER_BASE_URL! + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseData = await response.json();

  if (responseData?.acknowledgement === false) {
    return { message: responseData?.message, status: ApiStatus.ERROR };
  }

  const data = responseData?.data;

  const { accessToken, refreshToken } = data;

  setRefreshAndAccessToken(accessToken, refreshToken);

  // Redirect on success
  redirect("/");
  // return { message: "Login Successfull", status: ApiStatus.FINISH };
}

export async function logout() {
  const cookieStore = cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  redirect("/login");
}
