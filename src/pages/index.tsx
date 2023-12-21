import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import LoadingSpinner from '@/components/Spinnner';

import ProductListCard from '@/pages/_components/product-list-card';

import { Product } from '@/types/product';

export default function HomePage() {
  const [productList, setProductList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/product');
      const result = await res.json();
      setProductList(result.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <Seo templateTitle='Product List' />
      <Seo />

      <main className='layout'>
        <ButtonLink href='/add-product'>Add Product</ButtonLink>
        <ul className='mt-4 grid grid-cols-3 gap-4'>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            productList.map((product: Product) => (
              <ProductListCard product={product} key={product.id} />
            ))
          )}
        </ul>
      </main>
    </Layout>
  );
}
