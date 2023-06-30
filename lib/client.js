import { createClient } from "@sanity/client";
import imageurlBuilder from "@sanity/image-url";

export const client = createClient({
    // projectId: process.env.SANITY_PROJECT_ID,
    // dataset: process.env.SANITY_DATASET,
    // token: process.env.SANITY_TOKEN,
    // useCdn: process.env.SANITY_USE_CDN,

    projectId: "b6qxi1ba",
    dataset: "production",
    token: "skK6ugFiG8S3Tvps1xQ8p0gu1QX9ilxB9I9mcNCAafxaZni12mwkLqUmlRcObZFJWdMUyZyjREb3HdYH4Io2h0crXVyjsd6fb2oLKT4XOE8YETidC3M776huOUqrePi1nScU9zreVmCum34PgrPUUOhiYZ1j07FmiBbvkR1g9ghSiOa5HYP8",
    useCdn: false,

})

const builder = imageurlBuilder(client);

export const urlFor = (source) => builder.image(source);