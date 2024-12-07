import React from "react"
import ProductGrid from "@/sections/product-grid/product-grid";
import SecondaryPageLayout from "@/components/secondary-page/layout/layout";
import PageHeader from "@/components/secondary-page/page-header/page-header";
import PageContent from "@/components/secondary-page/page-content/page-content"

export default function Products() {
  return (
    <SecondaryPageLayout>
      <PageHeader
        title="Nuestros Productos"
        description="Descubre nuestra selección de comidas saludables y deliciosas"
        imageSrc="/products-header.jpg"
      />
      <PageContent>
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-apacha-green">Menú de la Semana</h2>
          <ProductGrid />
        </section>
        <section className="py-12 bg-apacha-beige">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-apacha-brown">Proceso de Preparación</h2>
            <p className="text-center text-apacha-black max-w-2xl mx-auto">
              Nuestros chefs expertos preparan cada plato con ingredientes frescos y de alta calidad. 
              Utilizamos técnicas de cocina que preservan el máximo sabor y valor nutricional de cada ingrediente.
            </p>
          </div>
        </section>
      </PageContent>
    </SecondaryPageLayout>
  );
};