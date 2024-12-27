import React from "react"
import ProductGrid from "@/sections/product-grid/product-grid";
import SecondaryPageLayout from "@/components/secondary-page/layout/layout";
import PageHeader from "@/components/secondary-page/page-header/page-header";
import PageContent from "@/components/secondary-page/page-content/page-content"
import CartWidget from "@/components/ui/cart-widget";

export default function ProductsPage() {
  return (
    <SecondaryPageLayout>
      <PageHeader
        title="Nuestros Productos"
        description="Tus grandes aliados para la rutina"
        imageSrc="/products-dips-2.jpg"
      />
      <PageContent>
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-apacha-green">Armá tu pack</h2>
          <ProductGrid />
        </section>
        <CartWidget />
      </PageContent>
    </SecondaryPageLayout>
  )
}