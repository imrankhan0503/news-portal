'use client'

import { signUpSchemas } from "@/actions/schemas";
import { SignUp } from "@/actions/signup-action";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LockKeyhole, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";

const SIgnUpForm = () => {


  const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(signUpSchemas)
  })


  const {mutate, error} = useMutation({
    mutationFn: SignUp
  })

  return (
    <div>
      <form onSubmit={handleSubmit((values) => mutate(values))} className="signup-form-card mx-auto max-w-md space-y-4 p-5">
        <div>
          <label className=" block text-left" htmlFor="username">
            Username
          </label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              {...register("username")}
              type="text"
              className="signup-form-input"
              placeholder="Username"
            />
          </div>
          <p className="text-left">
          {errors.username && <ErrorMessage error={errors.username.message!} />}
          </p>
        </div>

        <div>
          <label className="block text-left" htmlFor="email">
            Email
          </label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              {...register("email")}
              className="signup-form-input"
              placeholder="Email"
            />
          </div>
          <p className="text-left">
          {errors.email && <ErrorMessage error={errors.email.message!} />}
          </p>
        </div>

        <div>
          <label className="block text-left" htmlFor="password">
            Password
          </label>
          <div className="relative mt-1">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
             {...register("password")}
              type="password"
              className="signup-form-input"
              placeholder="Password"
            />
          </div>
          <p className="text-left">
          {errors.password && <ErrorMessage error={errors.password.message!} />}
          </p>
        </div>

        <button className="signup-button w-full">Register</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default SIgnUpForm;
