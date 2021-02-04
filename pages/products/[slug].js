import Head from 'next/head';
import { fromImageToUrl, API_URL } from '../../utils/urls';
import { toDecimals } from '../../utils/format';
import BuyButton from '../../components/BuyButton';

const Product = ({ product }) => {
  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title} </title>}
        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}
      </Head>
      <h3>{product.name}</h3>
      <img src={fromImageToUrl(product.image)} alt="" />
      <h3>{product.name}</h3>
      <p>
        ${toDecimals(product.price)} <BuyButton product={product} />{' '}
      </p>

      <p>{product.content}</p>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const product_res = await fetch(`${API_URL}/products/?slug=${slug}`);
  const found = await product_res.json();

  return {
    props: {
      product: found[0], //because the api response for filters is an array
    },
  };
}

export async function getStaticPaths() {
  // Recover all the possible paths

  const product_res = await fetch(`${API_URL}/products/`);
  const products = await product_res.json();

  // And then return them to NextJS context
  return {
    paths: products.map((product) => ({
      params: { slug: String(product.slug) },
    })),
    fallback: false, //404 if the params not matched
  };
}

export default Product;
