'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import { logInSchemas } from "./schemas"
import z from "zod"


 export const LogIn = async(userdata: z.infer<typeof logInSchemas>) => {

   

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword(userdata)

     if(error) throw error


     redirect("/")

 }