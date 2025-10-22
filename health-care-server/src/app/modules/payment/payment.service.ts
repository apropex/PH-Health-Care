import { PaymentStatus } from "@prisma/client";
import Stripe from "stripe";
import { prisma } from "../../shared/prisma";

const updatePaymentData = async (session: any) => {
  const appointmentId = session?.metadata?.appointmentId;
  const paymentId = session?.metadata?.paymentId;
  const status =
    session?.payment_status === "paid"
      ? PaymentStatus.PAID
      : PaymentStatus.UNPAID;

  return await prisma.$transaction(async (trx) => {
    const appointment = await trx.appointment.update({
      where: { id: appointmentId },
      data: { paymentStatus: status },
    });

    const payment = await trx.payment.update({
      where: { id: paymentId },
      data: { status, paymentGatewayData: session },
    });

    return { appointment, payment };
  });
};

const handleStripeWebhookEvent = async (event: Stripe.Event) => {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;
      return await updatePaymentData(session);
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object;
      return await updatePaymentData(intent);
    }

    default:
      return {};
  }
};

export default { handleStripeWebhookEvent };
