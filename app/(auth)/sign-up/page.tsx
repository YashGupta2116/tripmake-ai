import { SignUpForm } from "@/components/layout/sign-up-form";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Create account
          </h1>
          <p className="text-muted-foreground">
            Join us to plan your trip now!
          </p>
        </div>

        <SignUpForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an Account? <Link href={"/sign-in"}>Log In </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
