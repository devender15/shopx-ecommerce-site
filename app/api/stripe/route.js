import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export const POST = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { items } = await req.json();

      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "required",
        shipping_options: [
          {
            shipping_rate: "shr_1NtUWOSBYNzpnUnAlqYUfdDZ",
            shipping_rate: "shr_1NtUTpSBYNzpnUnAzCFm2RnT",
          },
        ],
        line_items: items.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/b6qxi1ba/production/"
            )
            // if the image is whether png, jpg, jpeg or webp, it will be replaced with respective format without -
            .replace("-png", ".png")
            .replace("-jpg", ".jpg")
            .replace("-jpeg", ".jpeg")
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `https://shoppizone.vercel.app/?success=true`,
        cancel_url: `https://shoppizone.vercel.app/?success=false`,
      };

      const session = await stripe.checkout.sessions.create(params);

      // return the session in new Response

      return new Response(JSON.stringify(session), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ message: error.message }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
};
