import { logout } from "@/utils/auth.utils";
import { Button } from "@heroui/button";

const LogoutBtn = () => {
  return (
    <form action={logout}>
      <Button type="submit" className=" w-full bg-white text-black">
        Logout
      </Button>
    </form>
  );
};

export default LogoutBtn;
