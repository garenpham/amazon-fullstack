const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
	'sk_test_51MaYh4IsNf8V7rUECnsbFw5Y1OVVBZsp8CM3WqKHUIrbRN3d1wvEwIWEb28o66pvQn2aZdWTcHSBkSKE4hIh4PVt00JRvZLwvs'
);

/**
 * API
 */

/**
 * App Config
 */
const app = express();

/**
 * Middlewares
 */
app.use(cors({ origin: true }));
app.use(express.json());

/**
 * API Routes
 */
// import { Request, Response } from 'express';
app.get('/', (request, response) => response.status(200).send('hello'));

app.post('/payments/create', async (request, response) => {
	const total = request.query.total;

	console.log(total);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, //subunits of the currency
		currency: 'usd',
	});

	// OK - Created
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});

/**
 * Listen command
 */
exports.api = functions.https.onRequest(app);
