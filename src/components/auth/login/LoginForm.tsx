/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SubmitBtn from "@/components/shared/SubmitBtn";
import { setRefreshAndAccessToken } from "@/libs/auth.libs";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiLogin } from "react-icons/ci";

// Assuming you have this

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [demoLoging, setDemoLogin] = useState(false)
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      handleLogin(email, password);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      { email, password }
    );

    const responseData = response.data;

    if (responseData?.acknowledgement === false) {
      setError(responseData.message);
      toast.error(responseData.message);
      return;
    }

    const { accessToken, refreshToken } = responseData.data;

    setRefreshAndAccessToken(accessToken, refreshToken);
    await new Promise((resolve) => setTimeout(resolve, 50))
    window.open("/", "_self")
  };

  return (
    <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-y-4">
      <Input
        type="email"
        label="Email"
        name="email"
        variant="underlined"
        required
        // isInvalid={!!error}
      />

      <Input
        type="password"
        label="Password"
        name="password"
        variant="underlined"
        required
        // isInvalid={!!error}
      />

      {error && <p className="text-red-500 text-center">{error}</p>}

      <SubmitBtn text="Sign In" loadingText="Signing In" loading={loading} />
      <Button
        onPress={async () => {
          try {
            setDemoLogin(true);
            await handleLogin(
              process.env.NEXT_PUBLIC_DEMO_EMAIL as string,
              process.env.NEXT_PUBLIC_DEMO_PASS as string
            );
          } catch (err: any) {
            setDemoLogin(false);
            const message =
              err?.response?.data?.message ||
              "Something went wrong. Please try again.";
            setError(message);
            toast.error(message);
          }
        }}
        isLoading={demoLoging}
        endContent={<CiLogin className=" text-xl font-bold" />}
        variant="solid"
        size="md"
        className="bg-red-500 text-white"
      >
        Login As Guest
      </Button>

      <p className="text-center">
        New Here?{" "}
        <Link
          className="hover:cursor-pointer underline duration-200"
          href="/register"
        >
          Register
        </Link>
      </p>
    </form>
  );
}

// "use client";

// import PasswordInput from "@/components/shared/PasswordInput";
// import { useAxios } from "@/hooks/useAxios";
// import { Button } from "@heroui/button";
// import { Input } from "@heroui/input";
// import Link from "next/link";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";
// import { ApiStatus } from "@/types/globals.types";

// // Define the form data structure matching the backend DTO
// interface LoginFormValues {
//   email: string;
//   password: string;
// }

// // Function to set tokens in cookies
// export const setRefreshAndAccessToken = (
//   accessToken: string,
//   refreshToken: string
// ) => {
//   const cookieStore = cookies();
//   cookieStore.set({
//     name: "accessToken",
//     value: accessToken,
//   });

//   cookieStore.set({
//     name: "refreshToken",
//     value: refreshToken,
//   });
// };

// const LoginForm = () => {
//   const axiosInstance = useAxios();
//   const router = useRouter();
//   const [loginStatus, setLoginStatus] = useState<ApiStatus>(ApiStatus.IDLE);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormValues>({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
//     setLoginStatus(ApiStatus.PENDING);
//     try {
//       const response = await axiosInstance.post("/auth/login", data);
//       const { accessToken, refreshToken } = response.data;

//       // Store tokens in cookies
//       setRefreshAndAccessToken(accessToken, refreshToken);

//       setLoginStatus(ApiStatus.FINISH);
//       console.log("Login successful:", response.data);

//       // Redirect to a protected route (e.g., dashboard)
//       router.push("/");
//     } catch (error) {
//       console.error("Login failed:", error);
//       setLoginStatus(ApiStatus.ERROR);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="w-[80%] flex flex-col gap-y-4"
//     >
//       {/* Email Input */}
//       <Input
//         type="email"
//         label="Email"
//         variant="underlined"
//         {...register("email", {
//           required: "Email is required",
//           pattern: {
//             value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//             message: "Invalid email address",
//           },
//         })}
//         isInvalid={!!errors.email}
//         errorMessage={errors.email?.message}
//       />

//       {/* Password Input */}
//       <PasswordInput
//         label="Password"
//         variant="underlined"
//         register={register}
//         registerOptions={{
//           required: "Password is required",
//           minLength: {
//             value: 6,
//             message: "Password must be at least 6 characters",
//           },
//         }}
//         isInvalid={!!errors.password}
//         errorMessage={errors.password?.message}
//       />

//       {/* Submit Button */}
//       <Button
//         type="submit"
//         className="bg-white text-black"
//         isLoading={loginStatus === ApiStatus.PENDING}
//       >
//         Submit
//       </Button>

//       {/* Register Link */}
//       <p className="text-center">
//         New Here?{" "}
//         <Link
//           className="hover:cursor-pointer underline duration-200"
//           href="/register"
//         >
//           Register
//         </Link>
//       </p>
//     </form>
//   );
// };

// export default LoginForm;
