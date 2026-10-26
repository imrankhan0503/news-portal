
import { LogOut } from "@/actions/logout-action";
import { createClient } from "@/lib/supabase/serverClient";
import Link from "next/link";


const AccountLinks = async () => {
    
    const supabase = await createClient()
    const {data: {user}, error } = await supabase.auth.getUser()

  return (
    <div className=" account-list flex gap-4">
      {user ?
           <>
           <div onClick={LogOut} className="register-links">Logout</div>
           <Link href = "/create" className="register-links">Create Post</Link>
           </>
         :
        <>
          <Link className="login-links" href="/">Home</Link>
          <Link className="login-links" href="/auth/login">Login</Link>
          <Link className="register-links" href="/auth/signup">Register</Link>
        </>
      }
    </div>
  )
}

export default AccountLinks;
