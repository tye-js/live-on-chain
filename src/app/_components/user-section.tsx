import { getServerAuthSession } from "@/server/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";
import LoginButton from "./login-button";
import SignOut from "./sign-out";

const UserSection = async () => {
  const session = await getServerAuthSession();
  return (
    <>
      {session && (
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.image!} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="font-mono">{session.user.name}</div>
          <SignOut />
        </div>
      )}
      {!session && <LoginButton />}
    </>
  );
};

export default UserSection;
