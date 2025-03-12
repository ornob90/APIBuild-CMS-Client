"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const setRefreshAndAccessToken = (
  accessToken: string,
  refreshToken: string
) => {
  console.log({ accessToken, refreshToken });
  const cookieStore = cookies();
  cookieStore.set({
    name: "accessToken",
    value: accessToken,
  });

  cookieStore.set({
    name: "refreshToken",
    value: refreshToken,
  });
};

export const getToken = () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("accessToken");
  return cookie?.value;
};

export const getSession = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("Session not found!");
  }

  const decoded = jwt.decode(token);

  // console.log(decoded)

  return decoded;
};
