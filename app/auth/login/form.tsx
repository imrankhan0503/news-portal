'use client'

import { LogIn } from "@/actions/login-action"
import { LockKeyhole, Mail } from "lucide-react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { logInSchemas } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"



const LoginForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(logInSchemas)
    })

     const {mutate, error, isPending} = useMutation({
        mutationFn: LogIn

      })
      console.log(error)
         
    return (
        <div>
            <form onSubmit={handleSubmit((values) => mutate(values) )} className="signup-form-card mx-auto max-w-md space-y-4 p-5">

                <div>
                        <label className="block text-left" htmlFor="email">Email</label>

                        <div className="relative mt-1">

                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <input {...register("email")} className="signup-form-input" placeholder="Email"  />

                    </div>

                    <p className="text-left">
                    {errors.email && <ErrorMessage error={errors.email.message!} />}
                    </p>
                 </div>
                

                <div>
                        <label className="block text-left" htmlFor="password">Password</label>

                        <div className="relative mt-1">

                        <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2"  />
                        <input {...register("password")} type="password" className="signup-form-input" placeholder="Password" />

                    </div>

                    <p className="text-left">
                    {errors.password && <ErrorMessage error={errors.password.message!} />}
                    </p>
                </div>
                

                <button className="signup-button w-full cursor-pointer">{isPending ? "Logging in" :  "Login"}</button>
                 {error && <ErrorMessage error={error.message} />}

            </form>
        </div>
    )
}

export default LoginForm