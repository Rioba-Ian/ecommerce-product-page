import CompletedOrderEmail from "@/emails/CompleteOrderStatus";
import { resend } from "./resend";

export async function sendCompletedOrderStatusEmail(
 email: string,
 time: number
) {
 try {
  await resend.emails.send({
   from: "riobafelix@gmail.com",
   to: email,
   subject: "Order Completed Successfully",
   react: CompletedOrderEmail({ email, time }),
  });

  return { success: true, message: "Email sent successfully" };
 } catch (err) {
  console.error("Error sending completed order email", err);
  return { success: false, message: "Failed to send email" };
 }
}
