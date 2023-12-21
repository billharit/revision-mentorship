import UnstyledLink from '@/components/links/UnstyledLink';

import { ProductListCardProps } from '@/types/product';

export default function ProductListCard({ product }: ProductListCardProps) {
  return (
    <UnstyledLink href={'/product/' + product.id}>
      <li className='flex flex-col justify-center gap-4 rounded-md border px-8 py-20'>
        <h2>{product.title}</h2>
        <p>{product.price}</p>
      </li>
    </UnstyledLink>
  );
}
