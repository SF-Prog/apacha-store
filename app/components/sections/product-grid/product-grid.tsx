"use client"

import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useStore } from "@/context/store-context";
import { useEffect } from "react"
import { capitalize } from "@/app/lib/utils"


const ProductGrid: React.FC = () => {
  const { addCartItem, products: productByCategoryList, loadProducts } = useStore();

  useEffect(() => {
    void loadProducts();
  }, []);

  const handleAddCartItem = (product: ProductItem) => {
    addCartItem(product)
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-apacha-brown">Categorías</h3>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-3 pb-2">
            {productByCategoryList.map((category) => (
              <Button
                key={category.category}
                variant="outline"
                size="sm"
                onClick={() => {
                  const element = document.getElementById(
                    `category-${category.category.toLowerCase().replace(/\s+/g, "-")}`,
                  )
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    })
                  }
                }}
                className="bg-apacha_green-100/10 flex-shrink-0 transition-all duration-200 hover:scale-105 hover:bg-apacha_green-100/10 hover:bg-apacha_green-100"
              >
                <span className="font-medium">{category.category}</span>
                <div className="w-1 h-1 bg-current rounded-full mx-2 opacity-60" />
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5 ml-1 bg-apacha-green/10 text-apacha-green">
                  {category.products.length}
                </Badge>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {productByCategoryList.map((category, index) => (
        <motion.div
          key={category.category}
          id={`category-${category.category.toLowerCase().replace(/\s+/g, "-")}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-apacha-brown mb-6">{category.category}</h2>
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
  )
}

export default ProductGrid
