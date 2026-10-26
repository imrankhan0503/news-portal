'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import { signUpSchemas } from "./schemas"
import z from "zod"


export const SignUp = async(userdata: z.infer<typeof signUpSchemas>) => {
       

      const supabase = await createClient()

       const { data: { user }, error } = await supabase.auth.signUp(userdata)

       if(error) throw error

       if(user && user.email){
        const { data, error } = await supabase.from("users").insert( {id: user.id, email: user.email, username: userdata.username} ) 
        if(error) throw error
      }

      redirect("/")
}
