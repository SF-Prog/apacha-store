"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { useStore } from "@/app/context/store-context"

interface Highlight {
  time: number // in seconds
  title: string
  description: string
}

interface WorkshopHighlightsSectionProps {
  title: string
  description: string
  videoSrc: string
  posterSrc?: string
  highlights?: Highlight[]
}

export function WorkshopHighlightsSection({
  title = "Descubre nuestros talleres de cocina",
  description = "Queremos compartir el conocimiento y herramientas que hemos aprendido y adquirido para que puedas disfrutar de cocinar alimentos ricos y nutritivos en tu casa.",
  videoSrc = "/apacha-workshops.mp4",
  posterSrc = "/apacha-door.png",
  highlights = [
    { time: 5, title: "Introducción", description: "Bienvenida y presentación de nuestros talleres" },
    {
      time: 30,
      title: "Taller de cocina vegana",
      description: "Participantes aprendiendo técnicas de cocina plant-based",
    },
    {
      time: 60,
      title: "Taller de postres saludables",
      description: "Creación de deliciosos postres sin azúcares refinados",
    },
    {
      time: 90,
      title: "Testimonios de participantes",
      description: "Experiencias compartidas por los asistentes a nuestros talleres",
    },
  ],
}: WorkshopHighlightsSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isRequestNextWorkshopOpen, setIsRequestNextWorkshopOpen] = useState<boolean>(false);
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const { sendWorkshopSubscription } = useStore();

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      setCurrentTime(video.currentTime)

      // Update active highlight based on current time
      const currentHighlight = highlights.findIndex((highlight, index) => {
        const nextHighlight = highlights[index + 1]
        return highlight.time <= video.currentTime && (!nextHighlight || video.currentTime < nextHighlight.time)
      })

      if (currentHighlight !== -1) {
        setActiveHighlight(currentHighlight)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
    }
  }, [highlights])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newTime = Number.parseFloat(e.target.value)
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const jumpToHighlight = (time: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = time
    setCurrentTime(time)
    if (!isPlaying) {
      video.play()
      setIsPlaying(true)
    }
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  };

  const handleWorkshopSubscription = () => {
    setIsRequestNextWorkshopOpen(false);
    sendWorkshopSubscription({ phone, topic });
    setPhone('');
  };

  const renderRequestFields = () => {
    if (!isRequestNextWorkshopOpen) return;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onClick={()=> setIsRequestNextWorkshopOpen(false)}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 15 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >


          <div className="flex flex-col w-full max-w-sm items-start space-x-0 gap-2 p-4">
            <div className='grid gap-2'>
              <Label className="" htmlFor="phone">Ingresa tu número de telefono para continuar</Label>
              <Input
                name="phone"
                placeholder="098 555 000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label className="text-start" htmlFor="topic">Contanos de que te interesa que sea nuestro siguiente taller</Label>
              <Input
                name="topic"
                placeholder="Taller de conservas"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <Button className="bg-apacha_orange-100" onClick={handleWorkshopSubscription}>
              <ArrowRight />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="pb-8 bg-gradient-to-b from-apacha-beige/50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-apacha-brown mb-4">{title}</h2>
            <p className="text-md md:text-lg text-gray-700 max-w-3xl mx-auto">{description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[380px] md:h-auto">
            <div className="lg:col-span-3">
              <div className="aspect-[3/4] md:aspect-video relative rounded-xl overflow-hidden shadow-2xl bg-black" ref={containerRef}>
                <video ref={videoRef} className="w-full h-full object-cover" poster={posterSrc} playsInline>
                  <source src={videoSrc} type="video/mp4" />
                  Tu navegador no soporta la reproducción de videos.
                </video>

                {/* Video overlay with controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
                  <div className="w-full">
                    {/* Progress bar */}
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #4A5D4F ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) 0%)`,
                      }}
                    />

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                          onClick={togglePlay}
                        >
                          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                          onClick={toggleMute}
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                        <span className="text-white text-sm">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={toggleFullscreen}
                      >
                        <Maximize className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {!isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={togglePlay}
                  >
                    <div className="rounded-full bg-apacha-green/90 p-5 shadow-lg">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden">
              <Card className="p-6 h-full bg-white/80 backdrop-blur-sm border-apacha-green/20">
                <h3 className="text-xl font-bold text-apacha-brown mb-4">Momentos Destacados</h3>
                <div className="space-y-4">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${activeHighlight === index
                          ? "bg-apacha-green text-white shadow-md"
                          : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      onClick={() => jumpToHighlight(highlight.time)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{highlight.title}</span>
                        <div className="flex items-center">
                          <span className="text-sm opacity-80">{formatTime(highlight.time)}</span>
                          <ChevronRight
                            className={`ml-1 h-4 w-4 ${activeHighlight === index ? "text-white" : "text-apacha-green"}`}
                          />
                        </div>
                      </div>
                      <p className={`text-sm mt-1 ${activeHighlight === index ? "text-white/90" : "text-gray-600"}`}>
                        {highlight.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button onClick={() => setIsRequestNextWorkshopOpen(true)} disabled={isRequestNextWorkshopOpen} className="bg-apacha_orange-100 hover:bg-apacha_orange-100/90 text-white px-8 py-6 rounded-full text-sm md:text-lg">
              Participa en Nuestro Próximo Taller
            </Button>
            {renderRequestFields()}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
