# stripe-poc

This Stripe PoC has following features:
* Add product through API;
* Show products retrieved through API;
* Show product tables;
* Buy product through API (invoice);
* List customers;
* Fake login as customer in PoC app;
* Open Stripe customer panel (hardcoded URL - "lazy");
* Open Stripe customer panel through API;
* Listen to Stripe events through webhook;
* Handle `invoice.paid` event to add products to customer in Poc App (resets after app reset);

## Test Stripe events
1. Get CLI - [https://github.com/stripe/stripe-cli/releases/tag/v1.13.8](https://github.com/stripe/stripe-cli/releases/tag/v1.13.8)
1. Login to stripe - `stripe login`;
1. Listen to events - `stripe listen --events invoice.paid --forward-to localhost:4300/stripe/webhook`

Refer to [https://stripe.com/docs/webhooks](https://stripe.com/docs/webhooks) if needed.
