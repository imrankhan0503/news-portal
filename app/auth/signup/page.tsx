import Link from "next/link";
import SIgnUpForm from "./form";

const SignupPage = () => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-center font-family-name:var(--font-news) text-4xl p-4 font-medium">
        Register
      </h2>
      <SIgnUpForm />
      Already have an account?
      <Link href="/auth/login">
        <span className="text-(--accent)"> Login</span>
      </Link>
    </div>
  );
};

export default SignupPage;
