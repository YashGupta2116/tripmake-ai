"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signupEmailAction } from "@/actions/auth-actions";
import { toast } from "sonner";

export const SignUpForm = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(true);
    if (password !== confirmPassword) {
      toast.error("Password does not match!");
      setIsPending(false);
    } else {
      const { error } = await signupEmailAction(fullName, email, password);

      if (error) {
        toast.error(error);
        setIsPending(false);
      } else {
        toast.success("Registration complete. You're all set.");
        router.push("/dashboard");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="text-sm font-medium text-foreground block"
        >
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="yash gupta"
          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-sm font-medium text-foreground block"
        >
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-foreground block"
        >
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
          required
          minLength={8}
        />
        <p className="text-xs text-muted-foreground">
          At least 8 characters with mixed case
        </p>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="confirm"
          className="text-sm font-medium text-foreground block"
        >
          Confirm password
        </Label>
        <Input
          id="confirm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
          required
        />
      </div>

      <Label className="flex items-start gap-3 cursor-pointer">
        <Input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="w-4 h-4 mt-1 bg-card border border-border rounded cursor-pointer accent-primary flex-shrink-0"
          required
        />
        <span className="text-sm text-muted-foreground">
          I agree to the{" "}
          <a
            href="#"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Privacy Policy
          </a>
        </span>
      </Label>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200 active:scale-95 mt-6"
        disabled={isPending}
      >
        {isPending ? "Signing In" : "Create Account"}
      </Button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border"></div>
        <span className="text-xs text-muted-foreground">Or sign up with</span>
        <div className="flex-1 h-px bg-border"></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-lg text-foreground hover:bg-card/80 transition-colors"
          disabled={isPending}
        >
          <Image src="/google-logo.svg" alt="google" width={14} height={14} />
          <span className="text-sm font-medium">Google</span>
        </Button>

        <Button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-lg text-foreground hover:bg-card/80 transition-colors"
          disabled={isPending}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="text-sm font-medium">GitHub</span>
        </Button>
      </div>
    </form>
  );
};
