import { createClient } from "@sanity/client";
import imageurlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION
})

const builder = imageurlBuilder(client);

export const urlFor = (source) => builder.image(source);