'use client'

import React from "react"
import SecondaryPageLayout from "@/components/secondary-page/layout/layout";
import PageHeader from "@/components/secondary-page/page-header/page-header";
import PageContent from "@/components/secondary-page/page-content/page-content"
import ScrollAnimatedBackground from "@/components/landing/scroll-animation/scroll-animation"
import { EventsLanding } from "@/components/sections/events-landing/events-landing";

export default function EventsPage() {
  return (
    <SecondaryPageLayout>
      <PageHeader
        title="Nuestra Variedad Gastronómica"
        description="Relajate y disfruta de tu fiesta mientras nos encargamos de la alimentacion."
        imageSrc="/catering-focaccia.jpg"
      />
      <PageContent>
         <EventsLanding />
      </PageContent>
    </SecondaryPageLayout>
  )
};