import { useEffect } from "react";
import { useRouter } from "next/navigation";

function UserMenu() {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("username");
    router.push("/login");
  }, []);

  return <div></div>;
}

export default UserMenu;
