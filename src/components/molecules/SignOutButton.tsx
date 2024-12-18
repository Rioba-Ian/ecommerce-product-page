"use client";
import { LogOut } from "lucide-react";
import React from "react";
import Button from "../atoms/Button";
import { logOut } from "@/app/signin/auth.actions";

const SignOutButton = () => {
 return (
  <Button
   onClick={() => {
    logOut();
   }}
   variant={"default"}
   className="flex justify-center items-center gap-2 font-bold"
  >
   <LogOut />
   Log out
  </Button>
 );
};

export default SignOutButton;
