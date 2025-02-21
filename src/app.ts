import cors from 'cors';
import express from 'express';
import path from 'path';
import Stripe from 'stripe';
import config from './app/config';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const stripe = new Stripe(config.stripe_secret as string);

const app = express();

// Parser
app.use(express.json());
app.use(cors());

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));

// Application route
app.use('', router);

app.post('/create-payment-intent', async (req, res) => {
  const price = req.body.productPrice;
  const amount = price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
