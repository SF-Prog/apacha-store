'use client'

import React from "react"
import SecondaryPageLayout from "@/components/secondary-page/layout/layout";
import PageHeader from "@/components/secondary-page/page-header/page-header";
import PageContent from "@/components/secondary-page/page-content/page-content"
import ScrollAnimatedBackground from "@/components/landing/scroll-animation/scroll-animation"
import { WorkshopsGrid } from "@/components/sections/workshops-grid/workshops-grid";

export default function WorkshopsPage() {
  return (
    <SecondaryPageLayout>
      <PageHeader
        title="Talleres"
        description="Te interesa conocer mas sobre Apacha y nuestros procesos, sumate!"
        imageSrc="/hero-2.jpg"
      />
      <PageContent>
        <WorkshopsGrid />
      </PageContent>
    </SecondaryPageLayout>
  )
};