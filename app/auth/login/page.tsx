import Link from "next/link";
import LoginForm from "./form";

const LoginPage = () => {
  return (
    <div className="text-center space-y-4">
      <h3 className="text-center font-family-name:var(--font-news) text-2xl p-1 font-medium">
        Welcome Back
      </h3>
      <p className="text-center font-family-name:var(--font-news) text-xl font-light">
        Login to your account to continue
      </p>
      <LoginForm />
      Don't have an account?
      <Link href="/auth/signup">
        <span className="text-(--accent)"> Register</span>
      </Link>
    </div>
  );
};

export default LoginPage;
