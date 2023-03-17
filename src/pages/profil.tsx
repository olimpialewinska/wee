
import Profile from "@/components/Profile";
import Login from "./login";
import { useSession } from '@supabase/auth-helpers-react'


export default function Account() {
  const session = useSession()
  return (
    <div className="container">
      {!session ? (
         <Login/>
      ) : (
        <Profile/>
      )}
    </div>
    
  );
}
