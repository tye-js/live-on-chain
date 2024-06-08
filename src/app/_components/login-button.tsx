"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const LoginButton = () => {
  return (
    <Button className="font-mono" variant="outline" onClick={() => signIn()}>
      Login In
    </Button>
  );
};

export default LoginButton;
