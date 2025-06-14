'use client'

import React from "react"
import SecondaryPageLayout from "@/components/secondary-page/layout/layout";
import PageHeader from "@/components/secondary-page/page-header/page-header";
import PageContent from "@/components/secondary-page/page-content/page-content"
import MenuLanding from "@/components/sections/menu-landing/menu-landing";

export default function MenuPage() {
  return (
    <SecondaryPageLayout>
      <PageHeader
        title="Solucionamos tus comidas diarias"
        description="Recibí un menú diferente todas las semanas"
        imageSrc="/menu-hero.jpg"
      />
      <PageContent>
        <MenuLanding />
      </PageContent>
    </SecondaryPageLayout>
  )
};