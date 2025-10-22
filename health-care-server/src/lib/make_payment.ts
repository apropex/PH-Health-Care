//

import Stripe from "stripe";
import _env from "../config";
import stripe from "../config/stripe/stripe.config";
import joinString from "../utils/joinString";

interface iOptions {
  email: string;
  doctorName: string;
  amount: number;
  quantity?: number;
  currency?: "bdt" | "usd";
  appointmentId: string;
  paymentId: string;
  patientEmail: string;
}

export default async function make_payment(
  options: iOptions,
): Promise<Stripe.Response<Stripe.Checkout.Session>> {
  const {
    email,
    doctorName,
    amount,
    quantity = 1,
    appointmentId,
    paymentId,
    patientEmail,
    currency = "bdt",
  } = options;

  //

  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: joinString("Appointment with ", doctorName),
          },
          unit_amount: amount * 100, // in cents
        },
        quantity,
      },
    ],
    metadata: {
      appointmentId,
      paymentId,
      doctorName,
      patientEmail,
    },
    success_url: _env.stripe.success_url,
    cancel_url: _env.stripe.cancel_url,
  });
}

//
