'use client'

import React from "react"
import SecondaryPageLayout from "@/components/secondary-page/layout/layout";
import PageHeader from "@/components/secondary-page/page-header/page-header";
import PageContent from "@/components/secondary-page/page-content/page-content"
import { EventsLanding } from "@/components/sections/events-landing/events-landing";

export default function EventsPage() {
  return (
    <SecondaryPageLayout>
      <PageHeader
        title="De la comida nos encargamos nosotros"
        description="Nos aseguramos de que tu evento sea una experiencia única e inigualable."
        imageSrc="/events_hummus.jpg?height=600px"
      />
      <PageContent>
         <EventsLanding />
      </PageContent>
    </SecondaryPageLayout>
  )
};