import _env from "../../../config";
import stripe from "../../../config/stripe/stripe.config";
import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./payment.service";

const handleStripeWebhookEvent = catchAsync(async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = _env.stripe.webhook_secret;

  const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

  const result = await services.handleStripeWebhookEvent(event);

  _response(res, {
    message: "Webhook req send successfully",
    data: result,
  });
});

export default { handleStripeWebhookEvent };
