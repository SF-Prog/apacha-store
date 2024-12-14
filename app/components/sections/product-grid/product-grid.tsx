'use client'

import React from 'react';
import Image from 'next/image';
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useStore } from '@/context/store-context';

const ProductGrid: React.FC = () => {
  const { products, addCartItem } = useStore();

  const handleAddCartItem = (product: ProductItem) => {
    addCartItem(product);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const handler = () => handleAddCartItem(product);
          return (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-apacha-green font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={handler} className="w-full">Agregar al Carrito</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid