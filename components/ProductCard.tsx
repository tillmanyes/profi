
import { Product } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { title } from 'process';



interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product._id}`} className="product-card">
        <div className='product-card_img-container'>
            <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className='product-card_img'
             />
        </div>

        <div className='flex flex-col gap-3'></div>
        <h3 className='product-title'>{product.title}</h3>

        <p className='text-black text-lg font-semibold'>
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
        </p>

    </Link>
  )
}

export default ProductCard