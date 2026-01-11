"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SignOutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("You’ve logged out. See you soon!");
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        size="sm"
        variant="destructive"
        disabled={isPending}
      >
        {isPending ? "Signing out..." : "Sign out"}
      </Button>
    </div>
  );
};
