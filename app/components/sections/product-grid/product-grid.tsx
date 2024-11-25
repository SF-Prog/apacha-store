import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/app/components/ui/button"

const products = [
  { id: 1, name: "Ensalada Mediterránea", price: 12.99, image: "/product1.jpg" },
  { id: 2, name: "Bowl de Quinoa y Vegetales", price: 14.99, image: "/product2.jpg" },
  { id: 3, name: "Wrap de Pollo y Aguacate", price: 11.99, image: "/product3.jpg" },
  { id: 4, name: "Salmón al Horno con Espárragos", price: 16.99, image: "/product4.jpg" },
  { id: 5, name: "Pasta Integral con Pesto", price: 13.99, image: "/product5.jpg" },
  { id: 6, name: "Tofu Salteado con Verduras", price: 12.99, image: "/product6.jpg" },
]

const ProductGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-apacha-green font-bold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Agregar al Carrito</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid