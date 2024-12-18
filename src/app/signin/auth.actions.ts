"use server";
import { googleOAuthClient } from "@/lib/google-oauth";
import { lucia } from "@/lib/lucia";
import { generateCodeVerifier, generateState } from "arctic";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getGoogleOAuthConsentUrl = async () => {
 try {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  (await cookies()).set("codeVerifier", codeVerifier, {
   httpOnly: true,
   secure: process.env.NODE_ENV === "production",
  });

  (await cookies()).set("state", state, {
   httpOnly: true,
   secure: process.env.NODE_ENV === "production",
  });

  const authUrl = googleOAuthClient.createAuthorizationURL(
   state,
   codeVerifier,
   ["profile", "email"]
  );

  return { success: true, url: authUrl.toString() };
 } catch (err) {
  console.error(err);
  return { success: false, error: "Something went wrong" };
 }
};

export const logOut = async () => {
 const sessionCookie = await lucia.createBlankSessionCookie();
 (await cookies()).set(
  sessionCookie.name,
  sessionCookie.value,
  sessionCookie.attributes
 );
 revalidatePath("/");
 return redirect("/");
};
