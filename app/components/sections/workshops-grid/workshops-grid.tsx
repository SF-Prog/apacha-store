"use client"

import { useEffect, type SyntheticEvent } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, User } from "lucide-react"
import { useStore } from "@/app/context/store-context"
import ScrollAnimatedBackground from "../../landing/scroll-animation/scroll-animation"
import { WorkshopHighlightsSection } from "../wokshop-highlights/workshop-highlights"

export function WorkshopsGrid() {
  const { workshops, loadWorkshops, onRegisterToWorkshop } = useStore()

  const hasAlreadyHappened = (w: Workshop): boolean => {
    const now = new Date();
    const eventDate = new Date(w.date);
    return eventDate < now;
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  // Filter workshops into upcoming and past
  const upcomingWorkshops = workshops.filter((workshop) => !hasAlreadyHappened(workshop))
  const pastWorkshops = workshops.filter((workshop) => hasAlreadyHappened(workshop))

  const renderActionButton = (workshop: Workshop) => {
    const isOld = hasAlreadyHappened(workshop);


    const label = !isOld ? "Reserva tu lugar" : "Ver detalles"
    const action = !isOld ? onRegisterToWorkshop : () => window.open(workshop.social_media_link, "_blank")

    const handleClick = (e: SyntheticEvent) => {
      e.preventDefault()
      action(workshop)
    };

    return (
      <Button
        onClick={handleClick}
        className={`w-full ${!isOld ? "bg-apacha_orange-100/70 hover:bg-apacha_orange-100/60" : "bg-gray-500 hover:bg-gray-600"}`} >
        {label}
      </Button>
    )
  }

  const capitalize = (str: string) => {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const renderWorkshopCard = (workshop: Workshop, index: number) => (
    <motion.div
      key={workshop.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <Image
          src={workshop.image || "/placeholder.svg"}
          alt={workshop.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
        />
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-apacha_orange-100">{workshop.title}</CardTitle>
          <CardDescription className="text-start">{capitalize(workshop.description)}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>
                {new Date(workshop.date).toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>
                {workshop.initial_time} - {workshop.finalization_time}
              </span>
            </div>
            {!hasAlreadyHappened(workshop) && (
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Cupos disponibles: {workshop.capacity}</span>
              </div>
            )}
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{workshop.location}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Tallerista: {workshop.author}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>{renderActionButton(workshop)}</CardFooter>
      </Card>
    </motion.div>
  )

  return (

    <ScrollAnimatedBackground
      imageSrc="/events-cooking.jpg"
      imageAlt="workshop-background">
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <WorkshopHighlightsSection
          title = "Revive nuestros talleres anteriores"
          description = "Mira los momentos destacados de nuestros talleres culinarios y descubre lo que te espera en los próximos eventos"
          videoSrc = "/apacha-workshops.mp4" />

        {/* Upcoming Workshops Section */}
        <section className="mb-16">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-apacha-brown mb-8 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Próximos talleres
          </motion.h2>

          {upcomingWorkshops.length > 0 ? (
            <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {upcomingWorkshops.map((workshop, index) => renderWorkshopCard(workshop, index))}
            </div>
          ) : (
            <div className="text-center py-8 bg-apacha_orange-100/60 rounded-lg max-w-3xl mx-auto">
              <p className="text-gray-600 text-sm md:text-md">
                No hay talleres programados próximamente. ¡Vuelve pronto para ver nuevas fechas!
              </p>
            </div>
          )}
        </section>

        {/* Past Workshops Section */}
        {pastWorkshops.length > 0 && (
          <section>
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-apacha-brown mb-8 text-center"
              initial={{ opacity: 1, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Talleres anteriores
            </motion.h2>

            <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pastWorkshops.map((workshop, index) => renderWorkshopCard(workshop, index))}
            </div>
          </section>
        )}
      </div>
    </ScrollAnimatedBackground>
  )
}
