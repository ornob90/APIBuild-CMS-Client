"use client";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { initialFormActionState } from "@/data/actions.data";
import { ApiStatus } from "@/types/globals.types";
import { login } from "@/utils/auth.utils";
import { Input } from "@heroui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

// Define the props for the component to handle server-side errors
interface LoginFormProps {
  error?: string;
}

// Server Component
export default function LoginForm({ error }: LoginFormProps = {}) {
  const [state, formAction] = useFormState(login, initialFormActionState);

  const router = useRouter();

  useEffect(() => {
    if (state && state?.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form
      action={formAction} // Bind the server action directly to the form
      className="w-[80%] flex flex-col gap-y-4"
    >
      {/* Email Input */}
      <Input
        type="email"
        label="Email"
        name="email" // Required for FormData
        variant="underlined"
        required
        isInvalid={!!error}
      />

      {/* Password Input */}
      <Input
        label="Password"
        type="password"
        name="password" // Required for FormData
        variant="underlined"
        required
        isInvalid={!!error}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Submit Button */}
      <SubmitBtn text="Sign In" loadingText="Signing In" />

      {/* Register Link */}
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
