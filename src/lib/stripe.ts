import Stripe from "stripe";

export const stripePreorderLink =
 "https://buy.stripe.com/test_8wM7urcMh76a3pC9AA";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
 apiVersion: "2024-12-18.acacia",
});
