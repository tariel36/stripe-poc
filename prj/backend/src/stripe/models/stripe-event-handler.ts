import { Request, Response } from 'express';
import Stripe from 'stripe';

export interface IOnEventContext {
  req: Request;
  res: Response;
  event: Stripe.Event;
}

export type EventDelegate = (ctx: IOnEventContext) => Promise<void>;

export class StripeEventHandler {
  public type: string;
  public delegate: EventDelegate;

  constructor(type: string, delegate: EventDelegate) {
    this.type = type;
    this.delegate = delegate;
  }
}
