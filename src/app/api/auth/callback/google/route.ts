import { googleOAuthClient } from "@/lib/google-oauth";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
 const url = req.nextUrl;

 const code = url.searchParams.get("code");
 const state = url.searchParams.get("state");

 if (!code || !state) {
  console.error("no code or state");

  return new Response("Invalid request", { status: 400 });
 }

 const codeVerifier = (await cookies()).get("codeVerifier")?.value;
 const savedState = (await cookies()).get("state")?.value;

 if (!codeVerifier || !savedState) {
  console.error("no code verifier or state");

  return new Response("Invalid request", { status: 400 });
 }

 if (state !== savedState) {
  console.error("state mismatch");

  return new Response("Invalid state", { status: 400 });
 }

 const verifiedData = await googleOAuthClient.validateAuthorizationCode(
  code,
  codeVerifier
 );

 const token = verifiedData.accessToken();

 const googleResponse = await fetch(
  "https://www.googleapis.com/oauth2/v1/userinfo",
  {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  }
 );

 const googleData = (await googleResponse.json()) as {
  id: string;
  email: string;
  name: string;
  picture: string;
 };

 let userId: string;

 //  if email exists, create a cookie for them and sign them in
 // if email doesn't exist create a new user then create a cookie to sign them in

 const existingUser = await prisma.user.findUnique({
  where: {
   email: googleData.email,
  },
 });

 if (existingUser) {
  userId = existingUser.id;
 } else {
  const newUser = await prisma.user.create({
   data: {
    email: googleData.email,
    name: googleData.name,
    picture: googleData.picture,
   },
  });
  userId = newUser.id;
 }

 console.log(userId, "userId");

 const session = await lucia.createSession(userId, {});
 const sessionCookie = await lucia.createSessionCookie(session.id);

 try {
  (await cookies()).set(
   sessionCookie.name,
   sessionCookie.value,
   sessionCookie.attributes
  );
 } catch (err) {
  console.error("Session creation error::", err);
  return new Response("Session creation error::" + err, { status: 500 });
 }

 return redirect("/");
}
