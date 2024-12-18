"use client";
import React from "react";
import Button from "../atoms/Button";
import { RiGoogleFill } from "@remixicon/react";
import { getGoogleOAuthConsentUrl } from "@/app/signin/auth.actions";
import { toast } from "sonner";

const GoogleOAuthButton = () => {
 return (
  <Button
   onClick={async () => {
    const res = await getGoogleOAuthConsentUrl();
    console.log(res.url, "url from google consent");

    if (res.url) {
     window.location.href = res.url;
    } else {
     toast.error(res.error);
    }
   }}
   className="py-2 px-6 flex items-center rounded-md justify-center bg-primaryEcommerce"
  >
   <RiGoogleFill className="mr-2 text-foreground/80" />
   Continue with Google
  </Button>
 );
};

export default GoogleOAuthButton;

/*
https://accounts.google.com/o/oauth2/v2/auth?
response_type=code&
client_id=725661943027-j43q50tcpu2prn02vbkvv3sf4ej5afns.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fgoogle%2Fcallback&state=0_I719-vAYBYPEmcpyaUHth7HvLUSIwJPDChEy82EMs&code_challenge_method=S256&code_challenge=mMP7vwtnx9zslG37pGpPeYR_02oP2bD1IDtqI1-kelM&
scope=profile+email
*/
