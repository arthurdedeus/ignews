/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream'
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false,
  }
}

const relevantEvents = new Set([
  'checkout.session.completed',
  'customers.subscriptions.created',
  'customers.subscriptions.updated',
  'customers.subscriptions.deleted',
])

export default async function (request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const buf = await buffer(request)
    const secret = request.headers['stripe-signature']

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
      return response.status(400).send(`Webhook error: ${error.message}`)
    }

    const { type } = event
    if (relevantEvents.has(type)) {

      try {

        switch (type) {

          case 'customers.subscriptions.created':
          case 'customers.subscriptions.updated':
          case 'customers.subscriptions.deleted':
            const subscription = event.data.object as Stripe.Subscription
            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              type === 'customers.subscriptions.created',
            )
            break

          case 'checkout.session.completed':
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            )
            break

          default:
            throw new Error(`Unhandled event type: ${type}`)
        }
      } catch (error) {
        return response.json({ error: 'Webhook handler failed'})
      }

    }

    response.json({ received: true})
  } else {
    response.setHeader('Allow', 'POST')
    response.status(405).send(`Method ${request.method} Not Allowed`)
  }
}
