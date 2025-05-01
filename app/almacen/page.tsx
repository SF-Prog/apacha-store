import React from "react"
import ProductGrid from "@/sections/product-grid/product-grid";
import SecondaryPageLayout from "@/components/secondary-page/layout/layout";
import PageHeader from "@/components/secondary-page/page-header/page-header";
import PageContent from "@/components/secondary-page/page-content/page-content"

export default function ProductsPage() {
  return (
    <SecondaryPageLayout>
      <PageHeader
        title="Almacén"
        description="Tus grandes aliados para la rutina"
        imageSrc="/products-dips-2.jpg"
      />
      <PageContent>
          
          <ProductGrid />
      </PageContent>
    </SecondaryPageLayout>
  )
}