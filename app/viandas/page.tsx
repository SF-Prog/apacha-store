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
        title="Te ayudamos a organizarte en tus comidas diarias"
        description="Proponemos un menú diferente cada semana para no caer en el aburrimiento y monotonía"
        imageSrc="/menu-hero.jpg"
      />
      <PageContent>
        <MenuLanding />
      </PageContent>
    </SecondaryPageLayout>
  )
};