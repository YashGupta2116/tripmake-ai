"use client";
import AuthForm from "@/components/layout/auth-form";
import { useState } from "react";

const page = () => {
  const [currentMode, setCurrentMode] = useState<"signin" | "signup">("signin");
  return (
    <div>
      <AuthForm
        mode={currentMode}
        onSwitchMode={() =>
          setCurrentMode(currentMode === "signin" ? "signup" : "signin")
        }
      />
    </div>
  );
};

export default page;
