import { useEffect } from "react";
import { useRouter } from "next/navigation";

function userMenu(props) {
  const router = useRouter();
  useEffect(()=> {
    localStorage.removeItem(props.key);
    router.push('/login.jsx');
  }, [])

  return (
    <div>
        <p>Hello {props.username}</p>
    </div>
  )
}

export default userMenu;