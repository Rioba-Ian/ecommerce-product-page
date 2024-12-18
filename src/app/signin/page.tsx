import GoogleOAuthButton from "@/components/molecules/GoogleOAuthButton";
import React from "react";

const SignIn = () => {
 return (
  <main className="grid grid-cols-1 place-content-center place-items-center min-h-screen">
   <GoogleOAuthButton />
  </main>
 );
};

export default SignIn;
