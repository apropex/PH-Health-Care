//

import Stripe from "stripe";
import _env from "..";

const stripe = new Stripe(_env.stripe.secret_key);

export default stripe;
