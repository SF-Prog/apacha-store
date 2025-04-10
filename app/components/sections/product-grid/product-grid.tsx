'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useStore } from '@/context/store-context';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { capitalize } from '@/lib/utils'

const ProductGrid: React.FC = () => {
  const { addCartItem, loadProducts, products } = useStore();

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddCartItem = (product: ProductItem) => {
    addCartItem(product);
  };

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-apacha-green">
        Armá tu pack
      </h2>
      <div className="container mx-auto px-4 py-8">
        {products?.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-black mb-6">{capitalize(category.category)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.products.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative h-80">
                      <Image
                        src={product.image?.length ? product.image : '/placeholder.svg'}
                        alt={product.title}
                        fill
                        style={{ objectFit: 'cover' }} 
                      />
                    </div>
                    <CardContent className="p-4 flex-grow">
                      <h3 className="text-lg font-semibold mb-2">{capitalize(product.title)}</h3>
                      {product.description && (
                        <p className="text-sm text-gray-600 mb-2">{capitalize(product.description)}</p>
                      )}
                      {product.meassures && (
                        <p className="text-sm text-gray-600 mb-2">{product.meassures}</p>
                      )}
                      <p className="text-apacha_green-100 font-bold">${product.price?.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => handleAddCartItem(product)} 
                        className="w-full bg-apacha_green-100 hover:bg-apacha_green-100/90 text-white transition-colors duration-300"
                      >
                        Agregar al Carrito
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ProductGrid