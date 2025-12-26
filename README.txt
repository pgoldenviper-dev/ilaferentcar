Stripe Node.js server (example)
1) Create a Stripe account and get your SECRET key.
2) Deploy this server (Heroku / Railway / Render). Set env var STRIPE_SECRET_KEY.
3) From the website, call POST /create-checkout-session with JSON:
   { "price": 250, "car":"Dacia Jogger", "success_url":"https://your-domain.com/success.html", "cancel_url":"https://your-domain.com/cancel.html" }
4) Server returns {id, url}. Redirect the user to the returned url (or use session.id with Stripe.js).
Note: 'mad' as currency may not be supported in all Stripe accounts; if unsupported, use 'usd' or 'eur' and convert prices.
