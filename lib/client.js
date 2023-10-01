import imageUrlBuilder  from "@sanity/image-url";
import { createClient } from "next-sanity";
const client = createClient({
    // this get in sanity dashboard in profile manage - id
  projectId: 'fv2f77x6',
  dataset: 'production',
    // current date
    apiVersion:"2023-09-24",
    // true because we featch data
    useCdn:false,
    // profile - manage - api - generate token name - check - editor 
    token:"skCFa97ccITDBQ6nHK1mOojIe4b8wxyhEAc2Vvmmwzhk3vfaYYsR0j9qYwEJgsGf9jSjop5OI1UrsMdX9Pnxp1r8ZSFmijwWCr9DgUiK0v1LYQvuzhNbnkdZti4PXV6wbq23ff0ztMdGlefebgCl1pAiPuJGUeRFcMpvmSTuZ20KMf0lS0Nl",
    ignoreBrowserTokenWarning: true,
});
export default client;


// this make able to fetch images
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source)