export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
export const MAGIC_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || 'pk_test_80757E3A011FE48E';
export const STRIPE_PK =
  process.env.NEXT_PUBLIC_STRIPE_PK ||
  'pk_test_ldsMjawYsGcUsdNYL88Fdpb000QVC4TXUM';

/**
 * given an image and then return the URL
 * works for local and deployed strapis
 * @param {any} image
 */

export const fromImageToUrl = (image) => {
  if (!image) {
    return '/vercel.svg';
  }

  if (image.url.indexOf('/') === 0) {
    return `${API_URL}${image.url} `;
  }

  return image.url;
};
