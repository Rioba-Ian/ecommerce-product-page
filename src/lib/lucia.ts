import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";
import { Lucia } from "lucia";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
 sessionCookie: {
  name: "lucia-auth-cookie",
  expires: false,
  attributes: {
   secure: process.env.NODE_ENV === "production",
  },
 },
});

export const getUser = async () => {
 const sessionId =
  (await cookies()).get(lucia.sessionCookieName)?.value || null;

 if (!sessionId) return null;

 const { session, user } = await lucia.validateSession(sessionId);

 try {
  if (session && session.fresh) {
   const sessionCookie = await lucia.createSessionCookie(session.id);

   (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
   );
  }
 } catch (err) {
  console.error(err);
 }

 const dbUser = await prisma.user.findUnique({
  where: {
   id: user?.id,
  },
  select: {
   id: true,
   name: true,
   email: true,
   picture: true,
  },
 });

 return dbUser;
};

export type TUser = Awaited<typeof getUser>;
