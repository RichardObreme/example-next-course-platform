"use client";

import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { stripeClientPromise } from "../stripeClient";
import { getClientSessionSecret } from "../actions/stripe";

type StripeCheckoutFormProps = {
  product: {
    id: string;
    name: string;
    priceInDollars: number;
    imageUrl: string;
    description: string;
  };
  user: {
    id: string;
    email: string;
  };
};

export default function StripeCheckoutForm({
  product,
  user,
}: StripeCheckoutFormProps) {
  return (
    <EmbeddedCheckoutProvider
      stripe={stripeClientPromise}
      options={{
        fetchClientSecret: getClientSessionSecret.bind(null, product, user),
      }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
