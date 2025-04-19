import { useEffect } from "react";
import { useRouter } from "next/navigation";

function UserMenu() {
  const router = useRouter();
  let greetingUser='';
  useEffect(()=> {
    greetingUser = 'Hello' + localStorage.getItem('username');
  })
  useEffect(()=> {
    localStorage.removeItem('username');
    router.push('/login');
  }, [])

  return (
    <div>
        <p>{greetingUser}</p>
    </div>
  )
}

export default UserMenu;