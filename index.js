const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Create checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const {price, car, success_url, cancel_url} = req.body;
    // Price in smallest currency unit (e.g., MAD uses centimes - if using USD change accordingly)
    // Here we expect price as number in MAD; convert to cents
    const amount = Math.round(Number(price) * 100);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'mad',
          product_data: { name: car || 'Car rental' },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: success_url || 'https://your-domain.com/success.html',
      cancel_url: cancel_url || 'https://your-domain.com/cancel.html',
    });
    res.json({id: session.id, url: session.url});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

// Basic health
app.get('/', (req,res)=>res.send('ILAFE Stripe server running'));

const PORT = process.env.PORT || 4242;
app.listen(PORT, ()=>console.log('Listening on', PORT));
