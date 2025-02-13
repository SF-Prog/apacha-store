'use client'

import React from "react"
import SecondaryPageLayout from "@/components/secondary-page/layout/layout";
import PageHeader from "@/components/secondary-page/page-header/page-header";
import PageContent from "@/components/secondary-page/page-content/page-content"
import ScrollAnimatedBackground from "@/components/landing/scroll-animation/scroll-animation"
import { EventsGrid } from "@/components/sections/events-grid/events-grid";

export default function EventsPage() {
  return (
    <SecondaryPageLayout>
      <PageHeader
        title="Caterings y eventos"
        description="Relajate y disfruta de tu fiesta mientras nos encargamos de la alimentacion."
        imageSrc="/hero-2.png"
      />
      <PageContent>
        <ScrollAnimatedBackground
          imageSrc="/lunch-table.jpg"
          imageAlt="lunch-table">
         <EventsGrid />
        </ScrollAnimatedBackground>
      </PageContent>
    </SecondaryPageLayout>
  )
};