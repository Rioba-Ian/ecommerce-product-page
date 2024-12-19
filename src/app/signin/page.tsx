import GoogleOAuthButton from "@/components/molecules/GoogleOAuthButton";
import React from "react";

const SignIn = () => {
 return (
  <main className="grid grid-cols-1 place-content-center place-items-center min-h-screen">
   <h1 className="text-foreground/90 py-4 text-4xl font-semibold">Login</h1>
   <p className="text-foreground py-2 mb-4">Sign in with your Google account</p>
   <GoogleOAuthButton />
  </main>
 );
};

export default SignIn;
