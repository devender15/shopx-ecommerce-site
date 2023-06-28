import { createClient } from "@sanity/client";
import imageurlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    useCdn: process.env.SANITY_USE_CDN,
})

const builder = imageurlBuilder(client);

export const urlFor = (source) => builder.image(source);