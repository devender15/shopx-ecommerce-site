import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST({request}) {
  console.log("POST /api/stripe");
  // const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  // console.log(request.body);
  // const data = await request.json();
}