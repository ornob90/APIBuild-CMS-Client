import { logout } from "@/utils/auth.utils";
import { Button } from "@heroui/button";

const LogoutBtn = () => {
  return (
    <form action={logout}>
      <Button variant="bordered" type="submit" className=" w-full  text-white">
        Logout
      </Button>
    </form>
  );
};

export default LogoutBtn;
